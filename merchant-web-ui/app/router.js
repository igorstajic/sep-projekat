import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('buy-insurance');
  this.route('order-error');
  this.route('order-success');
});

export default Router;
