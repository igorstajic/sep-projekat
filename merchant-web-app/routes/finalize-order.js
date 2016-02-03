var env = require('../config/environment');

module.exports = app => {
  app.route('/finalize-order')
    .post((req, res, next) => {
      // Return redirection url.
      res.json({
        'url': (req.body.finalizeRequest.result === 'success') ? env.successUrl : env.failedUrl
      });

    });
};
