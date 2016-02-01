var Policy = require('mongoose').model('Client');

var r = require('request');
var env = require('../config/environment');

// For generating payment-id.
function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
module.exports = app => {
  app.route('/submit-payment')
    .post((req, res, next) => {
      // Payment request to acquirer app.
      r.post({
        'url': env.acquirerUrl,
        'json': true,
        'body': {
          // TODO: Handle request data.
          'paymentRequest': {
            'pan': 'pan',
            'securityCode': '677',
            'cardHolderName': 'Pera Peric',
            'cardExpiryDate': '12/2016',
            'transactionAmount': 9999.99,
            'acquirerTimestamp': new Date().getTime()
          }
        }
      }, (error, httpResponse, body) => {
        // Get redirect url from merchant-web-app.
        res.json({
          'redirect': {
            'url': 'http://localhost:4200/payment-error'
          }
        });
      });
    });
};
