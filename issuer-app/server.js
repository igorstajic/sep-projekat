var express = require('express');
var mongoose = require('mongoose');
var env = require('./config/environment');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var fs = require('fs');

var https = require('https');
var privateKey  = fs.readFileSync('./ssl/server.key', 'utf8');
var certificate = fs.readFileSync('./ssl/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

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
require('./models/account');
var Account = mongoose.model('Account');

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
      const response = {
        status: (account.balance >= req.body.paymentRequest.transactionAmount) ? 'success' : 'failed',
        acquirerOrderId: req.body.paymentRequest.acquirerOrderId,
        acquirerTimestamp: req.body.paymentRequest.acquirerTimestamp,
        issuerOrderId: 12345,
        issuerTimestamp: new Date().getTime()
      };
      Account.update({
        '_id': account._id
      }, {
        'balance': account.balance - req.body.paymentRequest.transactionAmount,
        'reserved': account.reserved + req.body.paymentRequest.transactionAmount
      }, (error, data) => {
        res.json({
          'paymentResponse': response
        });
      });
    });
  });
