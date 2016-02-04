var Policy = require('mongoose').model('Policy');
var Order = require('mongoose').model('Order');

var env = require('../config/environment');

module.exports = app => {
  app.route('/finalize-order')
    .post((req, res, next) => {
      // Return redirection url.
      console.log(req.body);
      var responseUrl = env.failedUrl;
      if (req.body.finalizeRequest.result === 'success') {
        // TODO: Send email.
        Order.findOne({'orderId': req.body.finalizeRequest.merchantOrderId}, 'policy', (error, order) => {
          if (error) {
            return res.json({
              'error': error
            });
          }
          Policy.findOne({'_id': order.policy}, 'persons', (error, policy) => {
            if (error) {
              return res.json({
                'error': error
              });
            }
            var notificationEmailAddress = '';
            policy.persons.forEach(person => {
              if (person.email) {
                notificationEmailAddress = person.email;
              }
            });
            console.log("Sending email to:", notificationEmailAddress);
          });
        });
        responseUrl = env.successUrl;
      }
      res.json({
        'url': responseUrl
      });

    });
};
