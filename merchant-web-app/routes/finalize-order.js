var env = require('../config/environment');

module.exports = app => {
  app.route('/finalize-order')
    .post((req, res, next) => {
      // Return redirection url.
      console.log(req.body);
      var responseUrl = env.failedUrl;
      if (req.body.finalizeRequest.result === 'success') {
        // TODO: Send email.
        responseUrl = env.successUrl;
      }
      res.json({
        'url': responseUrl
      });

    });
};
