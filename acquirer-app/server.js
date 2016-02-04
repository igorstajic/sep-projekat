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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  app.listen(3002, function() {
    console.log('listening on 3002');
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
