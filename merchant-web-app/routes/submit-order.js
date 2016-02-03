var Policy = require('mongoose').model('Policy');
var Order = require('mongoose').model('Order');


var r = require('request');
var env = require('../config/environment');

function calculatePolicyAmount(policy) {
  return 100;
}

function handleError(res) {
  return res.json({
    'redirect': {
      'url': env.errorUrl
    }
  });
}
module.exports = app => {
  app.route('/submit-order')
    .post((req, res, next) => {
      var newPolicy = new Policy({
        "region": req.body.insurancePolicy.region,
        "amountLimit": req.body.insurancePolicy.amountLimit
      });
      newPolicy.save((error, policy) => {
        if (error) {
          return handleError(res);
        }
        var newOrder = new Order({
          "timestamp": new Date().getTime(),
          'amount': calculatePolicyAmount(),
          "policy": policy._id
        });
        newOrder.save((error, order) => {
          if (error) {
            return handleError(res);
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
            console.log(body);
            if (error || body.paymentInfoResponse === undefined) {
              return handleError(res);
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
