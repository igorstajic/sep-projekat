var Client = require('mongoose').model('Client');

module.exports = app => {
  app.post('/', (req, res, next) => {
    Client.findOne({
      merchantId: req.body.paymentRequest.merchantId
    }, function(err, data) {
      if (err) {
        return next(err);
      } else {
        if (data.password === req.body.paymentRequest.merchantPassword) {
          res.json({
            'paymentResponse': {
              'url': 'http://localhost:4201/payment',
              'id': '12345'
            }
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
