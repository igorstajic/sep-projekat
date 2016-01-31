var Policy = require('mongoose').model('Client');

var r = require('request');
var env = require('../config/environment');

// For generating payment-id.
function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
module.exports = app => {
  app.route('/submit-payment')
    .post((req, res, next) => {});
};
