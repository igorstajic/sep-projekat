var express = require('express');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

require('./models/client');
require('./models/payment');
require('./models/transaction');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  httpsServer.listen(5443, () => {
    console.log('listening on 5443');
  });
});

require('./routes/submit-payment')(app);
require('./routes/index')(app);
