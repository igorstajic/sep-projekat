import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default'],
  person: null,
  showEmail: false,
  headerText: 'Traveler information',
  isShown: true,
  validation: Ember.observer('didValidate', function() {
    this.set('isShown', true);
  }),
  actions: {
    toggleColapse(){
      this.toggleProperty('isShown');
    }
  }
});
