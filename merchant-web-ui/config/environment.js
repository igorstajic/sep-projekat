/* jshint node: true */
const contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self'",
  'font-src': "'self' https://fonts.gstatic.com",
  'connect-src': "'self' localhost:* http://127.0.0.1:*",
  'img-src': "'self'",
  'style-src': "'self'",
  'media-src': "'self'"
};
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'merchant-web-ui',
    environment: environment,
    baseURL: '/',
    contentSecurityPolicy: contentSecurityPolicy,
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
