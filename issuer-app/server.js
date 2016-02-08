var express = require('express');
var mongoose = require('mongoose');
var env = require('./config/environment');
var autoIncrement = require('mongoose-auto-increment');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var fs = require('fs');

var https = require('https');
var privateKey = fs.readFileSync('./ssl/server.key', 'utf8');
var certificate = fs.readFileSync('./ssl/server.crt', 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate
};

app.use(logger('dev'));
app.use(bodyParser.json());

var httpsServer = https.createServer(credentials, app);

var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};

mongoose.connect(env.db, options);

var db = mongoose.connection;
autoIncrement.initialize(db);
require('./models/account');
require('./models/paymentRecord');

var Account = mongoose.model('Account');
var PaymentRecord = mongoose.model('PaymentRecord');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  httpsServer.listen(6443, () => {
    console.log('listening on 6443');
  });
});

var r = require('request');

function handleError(res, err) {
  return res.json({
    'error': {
      'details': err
    }
  });
}

app.route('/payment')
  .post((req, res, next) => {
    Account.findOne({
      'cardNumber': req.body.paymentRequest.pan
    }, 'balance reserved', function(err, account) {
      if (err) {
        return handleError(res, err);
      }
      if (account === null) {
        return handleError(res, 'Invalid card number.');
      }
      var newRecord = new PaymentRecord({
        'status': (account.balance >= req.body.paymentRequest.transactionAmount) ? 'success' : 'failed',
        'acquirerOrderId': req.body.paymentRequest.acquirerOrderId,
        'acquirerTimestamp': req.body.paymentRequest.acquirerTimestamp,
        'issuerTimestamp': new Date().getTime()
      });
      newRecord.save((error, payment) => {
        if (error || payment === null) {
          return handleError(res, payment.errorUrl, error);
        }
        Account.update({
          '_id': account._id
        }, {
          'balance': account.balance - req.body.paymentRequest.transactionAmount,
          'reserved': account.reserved + req.body.paymentRequest.transactionAmount
        }, (error, data) => {
          res.json({
            'paymentResponse': payment
          });
        });
      });

    });
  });
