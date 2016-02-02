var express = require('express');
var mongoose = require('mongoose');
var env = require('./config/environment');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

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
  app.listen(3004, function() {
    console.log('listening on 3004');
  });
});

var r = require('request');
var env = require('../config/environment');

app.route('/payment')
  .post((req, res, next) => {
    Account.findOne({
      'cardNumber': req.body.paymentRequest.pan
    }, 'balance', function(err, account) {
      if (err) return handleError(err);
      const response = {
        status: (account.balance > req.body.paymentRequest.amount) ? 'sucess' : 'failed',
        acquirerOrderId: req.body.paymentRequest.acquirerOrderId,
        acquirerTimestamp: req.body.paymentRequest.acquirerTimestamp,
        issuerOrderId: 12345,
        issuerTimestamp: new Date().getTime()
      };
      res.json(response);
    });
  });
