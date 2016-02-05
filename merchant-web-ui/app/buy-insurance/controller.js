import Ember from 'ember';

export default Ember.Controller.extend({
  regionList: ['Europe', 'Asia', 'Australia', 'North America', 'South America', 'Japan'],
  actions: {
    addPerson: function() {
      let newPerson = this.store.createRecord('person');
      this.get('model.persons').pushObject(newPerson);
    },
    updateStartDate(date) {
      Ember.Logger.debug('date:', date);
    }
  }
});
