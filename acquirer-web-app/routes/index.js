var Client = require('mongoose').model('Client');
var env = require('../config/environment');

module.exports = app => {
  app.post('/', (req, res, next) => {
    Client.findOne({
      merchantId: req.body.paymentInfoRequest.merchantId
    }, function(err, data) {
      if (err) {
        return next(err);
      } else {
        if (data.password === req.body.paymentInfoRequest.merchantPassword) {
          res.json({
            'paymentInfoResponse': {
              'url': env.paymentUrl,
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
