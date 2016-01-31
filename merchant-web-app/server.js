var express = require('express');
var mongoose = require('mongoose');
var env = require('./config/environment');
var logger = require('morgan');
var API = require('json-api');
var APIError = API.types.Error
var app = express();

app.use(logger('dev'));

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

var Policy = require('./models/policy');
var Person = require('./models/person');
mongoose.connect(env.db, options);
var models = {
  Policy: Policy.model,
  Person: Person.model
}
var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
  policies: Policy.resource,
  persons: Person.resource
}, {
  dbAdapter: adapter
});

var Controller = new API.controllers.API(registry);

var Front = new API.httpStrategies.Express(Controller);
var apiReqHandler = Front.apiRequest.bind(Front);

app.route("/:type(policies|persons)")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route("/:type(policies|persons)/:id")
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
app.route("/:type(policies|persons)/:id/relationships/:relationship")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.use(function(req, res, next) {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
});
// app.get('/', (req, res) => {
//   Policy.find(function(err, policies) {
//     if (err) return console.error(err);
//     console.log('data:', policies);
//
//   });
//   console.log('test');
//   res.send('hello!')
//
// })
