import DS from 'ember-data';
import config from 'acquirer-web-ui/config/environment';

export default DS.RESTAdapter.extend({
  host: config.APP.acquirerApi
});
