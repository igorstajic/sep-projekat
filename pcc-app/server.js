var express = require('express');
var mongoose = require('mongoose');
var env = require('./config/environment');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

var fs = require('fs');

var https = require('https');
var privateKey = fs.readFileSync('./ssl/server.key', 'utf8');
var certificate = fs.readFileSync('./ssl/server.crt', 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate
};

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
require('./models/issuer');
var Issuer = mongoose.model('Issuer');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  httpsServer.listen(7443, () => {
    console.log('listening on 7443');
  });
});

var r = require('request');

app.route('/authorize-payment')
  .post((req, res, next) => {
    Issuer.findOne({
      'pan': req.body.paymentRequest.pan
    }, 'url', function(err, issuer) {
      if (err) {
        return handleError(res, 500,  err);
      }
      if (issuer === null) {
        return handleError(res, 404, 'Issuer does not exist in the database.');
      }
      r.post({
        'url': issuer.url,
        'json': true,
        'rejectUnauthorized': false,
        'body': req.body,
      }, (error, httpResponse, body) => {
        res.json(body);
      });
    });
  });

function handleError(res, status, error) {
  res.status(status);
  return res.json({
    'error': {
      'details': error
    }
  });
}
