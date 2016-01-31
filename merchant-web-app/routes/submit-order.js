var Policy = require('mongoose').model('Policy');

var r = require('request');
var env = require('../config/environment');

function calculatePolicyAmount(policy) {
  return 100;
}
// For generating order-id.
function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
module.exports = app => {
  app.route('/submit-order')
    .post((req, res, next) => {
      // Submit order request to acquirer app.
      r.post({
        'url': env.acquirerUrl,
        'json': true,
        'body': {
          'paymentRequest': {
            'merchantId': env.merchantId,
            'merchantPassword': env.merchantPassword,
            'amount': calculatePolicyAmount(),
            'orderId': randomIntInc(0, 9999999999),
            'timestamp': new Date().getTime(),
            'errorUrl': 'http://localhost:4200/payment-error'
          }
        }
      }, (error, httpResponse, body) => {
        // Respond to the submit request.
        if (error || body.paymentResponse === undefined) {
          res.json({
            'redirect': {
              'url': 'http://localhost:4200/payment-error'
            }
          });
        } else {
          res.json({
            'redirect': {
              'url': body.paymentResponse.url,
              'param': body.paymentResponse.id
            }
          });
        }
      });
    })
    .get((req, res, next) => {
      Policy.find({}, (err, policies) => {
        if (err) {
          return next(err);
        } else {
          res.json({
            'policies': policies
          });
        }
      });
    });

};
