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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  httpsServer.listen(4443, () => {
    console.log('listening on 4443');
  });
});

var r = require('request');

app.route('/authorize-payment')
  .post((req, res, next) => {
    r.post({
      'url': env.pccUrl,
      'json': true,
      'body': req.body,
    }, (error, httpResponse, body) => {
      res.json(body);
    });
  });
