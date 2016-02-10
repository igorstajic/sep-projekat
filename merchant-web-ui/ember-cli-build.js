/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: ['app']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('vendor/css/animate.min.css');
  app.import('vendor/css/responsive.css');
  app.import('vendor/css/main.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {
    destDir: 'assets'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/font-awesome/css/font-awesome.css.map');
  app.import('bower_components/font-awesome-animation/dist/font-awesome-animation.min.css');
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {
    destDir: 'fonts'
  });

  app.import('vendor/css/checkbox.png', {
    destDir: 'images'
  });
  app.import('vendor/images/home/slider/hill.png', {
    destDir: 'images/home'
  });
  app.import('vendor/images/home/slider/sun.png', {
    destDir: 'images/home'
  });
  app.import('vendor/images/home/slider/house.png', {
    destDir: 'images/home'
  });
  app.import('vendor/images/home/slider/birds1.png', {
    destDir: 'images/home'
  });
  app.import('vendor/images/home/slider/birds2.png', {
    destDir: 'images/home'
  });
  app.import('vendor/images/home/slider-bg.png', {
    destDir: 'images/home'
  });
  app.import('vendor/images/home/tour-bg.png', {
    destDir: 'images/home'
  });


  return app.toTree();
};
