var Policy = require('mongoose').model('Policy');
var Order = require('mongoose').model('Order');


var r = require('request');
var env = require('../config/environment');

/*
Request example:
"insurancePolicy": {
  "region": "Europe",
  "timePeriod": 1454535344837,
  "sport": "football",
  "amountLimit": 50000,
  "persons": [
  {
    "fullName":"Pera Peric",
    "jmbg": 1010990800213,
    "passportNumber": 512124
  },
  {
    "fullName":"Sima Simic",
    "jmbg": 1010992893010,
    "passportNumber": 124124,
    "email": "simasimic@gmail.com"
  }],
  "homeInsurance":{
    "estimatedValue": 50000
  }
}
*/
module.exports = app => {
  app.route('/submit-order')
    .post((req, res, next) => {
      console.log('body:', req.body.insurancePolicy);
      var newPolicy = new Policy(req.body.insurancePolicy);
      newPolicy.save((error, policy) => {
        if (error) {
          return handleError(res, error);
        }
        var newOrder = new Order({
          "timestamp": new Date().getTime(),
          'amount': calculatePolicyAmount(),
          "policy": policy._id
        });
        newOrder.save((error, order) => {
          if (error) {
            return handleError(res, error);
          }
          // Submit order request to acquirer app.
          r.post({
            'url': env.acquirerUrl,
            'json': true,
            'body': {
              'paymentInfoRequest': {
                'merchantId': env.merchantId,
                'merchantPassword': env.merchantPassword,
                'amount': order.amount,
                'orderId': order.orderId,
                'timestamp': order.timestamp,
                'errorUrl': env.errorUrl
              }
            }
          }, (error, httpResponse, body) => {
            // Respond to the submit request.
            if (error || body.paymentInfoResponse === undefined) {
              return handleError(res, error);
            } else {
              res.json({
                'redirect': {
                  'url': body.paymentInfoResponse.url,
                  'param': body.paymentInfoResponse.paymentId
                }
              });
            }
          });
        });
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

function handleError(res, error) {
  res.status(500);
  return res.json({
    'error': {
      'details': error
    }
  });
}

function calculatePolicyAmount(policy) {
  return 100;
}
