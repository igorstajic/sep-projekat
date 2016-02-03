var Policy = require('mongoose').model('Client');

var r = require('request');
var env = require('../config/environment');

// For generating payment-id.
function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
module.exports = app => {
  app.route('/submit-payment/:paymentId')
    .post((req, res, next) => {
      // Payment request to acquirer app.
      r.post({
        'url': env.acquirerUrl,
        'json': true,
        'body': {
          // TODO: Handle request data.
          'paymentRequest': {
            'pan': 4532678296618897,
            'securityCode': '677',
            'cardHolderName': 'Pera Peric',
            'cardExpiryDate': '12/2016',
            'transactionAmount': 9999.99,
            'acquirerOrderId': randomIntInc(0, 99999999),
            'acquirerTimestamp': new Date().getTime()
          }
        }
      }, (error, httpResponse, body) => {
        // Get redirect url from merchant-web-app.
        console.log('body:', body);
        r.post({
          'url': env.finalizeUrl,
          'json': true,
          'body': {
            // TODO: Handle request data.
            'finalizeRequest': {
              'result': body.paymentResponse.status,
              'paymentId': req.params.paymentId,
              'acquirerOrderId': body.paymentResponse.acquirerOrderId,
              'acquirerTimestamp': body.paymentResponse.acquirerTimestamp
            }
          }
        }, (error, httpResponse, body) => {
          res.json({
            'redirect': {
              'url':  body.url,
              'body': body
            }
          });
        });
      });
    });
};
