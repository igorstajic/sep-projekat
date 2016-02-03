var Client = require('mongoose').model('Client');
var Payment = require('mongoose').model('Payment');

var env = require('../config/environment');

module.exports = app => {
  app.post('/', (req, res, next) => {
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
