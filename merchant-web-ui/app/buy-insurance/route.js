import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('insurance-policy', {
      region: 'Europe',
      amountLimit: 5000,
      sport: 0,
      persons: [this.store.createRecord('person', {
        isInsuranceHolder: true
      })]
    });
  }
});
