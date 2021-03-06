var Payment = require('mongoose').model('Payment');
var Transaction = require('mongoose').model('Transaction');


var r = require('request');
var env = require('../config/environment');

/*
Request example:
"cardInfo": {
  "pan": 4532678296618897,
  "securityCode": 667,
  'cardHolderName': 'Pera Peric',
  'cardExpiryDate': '12/2016'
}
*/
function handleError(res, errorUrl, error) {
  if (error) {
    console.log('error:', error);
  }
  return res.json({
    'redirect': {
      'url': errorUrl
    }
  });
}

module.exports = app => {
  app.route('/submit-payment/:paymentId').post((req, res, next) => {
    Payment.findOne({
      'paymentId': req.params.paymentId
    }, (error, payment) => {
      if (error || payment === null) {
        return handleError(res, payment.errorUrl, 'Invalid payment id.');
      }
      Transaction.findOne({
        'payment': payment._id
      }, (error, transaction) => {
        if (error || transaction) {
          return handleError(res, payment.errorUrl, 'Transaction in progress.');

        } else {
          var newTransaction = new Transaction({
            'acquirerTimestamp': new Date().getTime(),
            'payment': payment._id
          });
          newTransaction.save((error, transaction) => {
            if (error || transaction === null) {
              return handleError(res, payment.errorUrl, error);
            }
            // Payment request to acquirer app.
            r.post({
              'url': env.acquirerUrl,
              'json': true,
              'rejectUnauthorized': false,
              'body': {
                'paymentRequest': {
                  'pan': req.body.cardInfo.pan,
                  'securityCode': req.body.cardInfo.securityCode,
                  'cardHolderName': req.body.cardInfo.cardHolderName,
                  'cardExpiryDate': req.body.cardInfo.cardExpiryDate,
                  'transactionAmount': payment.amount,
                  'acquirerOrderId': transaction.acquirerOrderId,
                  'acquirerTimestamp': transaction.acquirerTimestamp
                }
              }
            }, (error, httpResponse, body) => {
              // Get redirect url from merchant-web-app.
              if (!body) {
                return handleError(res, payment.errorUrl, error);
              }
              if (body.error) {
                return handleError(res, payment.errorUrl, error);
              }
              r.post({
                'url': env.finalizeUrl,
                'json': true,
                'rejectUnauthorized': false,
                'body': {
                  'finalizeRequest': {
                    'result': body.paymentResponse.status,
                    'paymentId': req.params.paymentId,
                    'merchantOrderId': payment.merchantOrderId,
                    'acquirerOrderId': body.paymentResponse.acquirerOrderId,
                    'acquirerTimestamp': body.paymentResponse.acquirerTimestamp
                  }
                }
              }, (error, httpResponse, body) => {
                if (error) {
                  return handleError(res, payment.errorUrl, error);
                }
                res.json({
                  'redirect': {
                    'url': body.url
                  }
                });
              });
            });
          });
        }
      });
    });
  });
};
