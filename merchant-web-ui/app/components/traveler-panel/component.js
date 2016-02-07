import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default'],
  person: null,
  showEmail: false,
  headerText: 'Traveler information'
});
