import Ember from 'ember';

export default Ember.Component.extend({
  selectedPerson: null,
  actions: {
    selectPerson: function(person) {
      this.set('selectedPerson', person);
    }
  }
});
