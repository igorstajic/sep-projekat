var Client = require('mongoose').model('Client');
var Payment = require('mongoose').model('Payment');

var env = require('../config/environment');

module.exports = app => {
  app.get('/payments/:paymentId', (req, res, next) => {
    Payment.findOne({
      'paymentId': req.params.paymentId
    }, (error, payment) => {
      if (error) {
        res.status(500);
        res.json({
          'error': {
            'details': error
          }
        });
        return;
      }
      if (payment === null) {
        res.status(404);
        res.json({
          'error': {
            'details': 'Not found'
          }
        });
        return;
      }
      res.json({
        'payment':{
          'id': req.params.paymentId,
          'amount': payment.amount,
          'errorUrl': payment.errorUrl
        }
      });
    });
  });
  app.post('/payments', (req, res, next) => {
    console.log(req.body.paymentInfoRequest.merchantId);
    Client.findOne({
      merchantId: req.body.paymentInfoRequest.merchantId
    }, (err, client) => {
      if (err) {
        return next(err);
      } else {
        if (client === null) {
          return res.json({
            'error': {
              'details': 'Merchant ID does not exist.',
            }
          });
        }
        if (client.password === req.body.paymentInfoRequest.merchantPassword) {
          var newPayment = new Payment({
            'amount': req.body.paymentInfoRequest.amount,
            'merchantOrderId': req.body.paymentInfoRequest.orderId,
            'errorUrl': req.body.paymentInfoRequest.errorUrl,
            'client': client._id
          });
          newPayment.save((error, payment) => {
            res.json({
              'paymentInfoResponse': {
                'url': env.paymentUrl,
                'paymentId': payment.paymentId
              }
            });
          });
        } else {
          res.json({
            'error': {
              'details': 'Merchant ID and password combination does not exist.',
            }
          });
        }
      }
    });
  });
};
