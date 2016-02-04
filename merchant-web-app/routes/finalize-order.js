var Policy = require('mongoose').model('Policy');
var Order = require('mongoose').model('Order');

var env = require('../config/environment');
var nodemailer = require('nodemailer');

module.exports = app => {
  app.route('/finalize-order')
    .post((req, res, next) => {
      // Return redirection url.
      console.log(req.body);
      const orderStatus = req.body.finalizeRequest.result === 'success';
      var responseUrl = (orderStatus) ? env.successUrl : env.failedUrl;

      Order.findOne({
        'orderId': req.body.finalizeRequest.merchantOrderId
      }, 'policy', (error, order) => {
        if (error) {
          return res.json({
            'error': error
          });
        }
        Policy.findOne({
          '_id': order.policy
        }, 'persons', (error, policy) => {
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
          var transporter = nodemailer.createTransport('smtps://sep2015development%40gmail.com:vuInoGoW05jT@smtp.gmail.com');

          var emailBody = (orderStatus) ? 'Your order was successful.' : 'There was an error processing your order.';
          var mailOptions = {
            from: 'myinsurance <noreply@myinsurance.com>', // sender address
            to: 'igorstajic273@gmail.com', // list of receivers
            subject: 'Insurance order reciept', // Subject line
            html: emailBody // html body
          };
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: ' + info.response);
          });
        });
      });
      responseUrl = env.successUrl;

      res.json({
        'url': responseUrl
      });

    });
};
