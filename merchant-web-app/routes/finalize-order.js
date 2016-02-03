var env = require('../config/environment');

module.exports = app => {
  app.route('/finalize-order')
    .post((req, res, next) => {
      // Return redirection url.
      console.log(req.body);
      res.json({
        'url': (req.body.finalizeRequest.result === 'success') ? env.successUrl : env.failedUrl
      });

    });
};
