import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  regionList: ['Europe', 'Asia', 'Australia', 'North America', 'South America', 'Japan'],
  amountLimits: [{
    id: 5000,
    value: 'up to 5000 €'
  }, {
    id: 10000,
    value: 'up to 10000 €'
  }, {
    id: 15000,
    value: 'up to 15000 €'
  }, {
    id: 30000,
    value: 'up to 30000 €'
  }],
  paymentRedirection: null,
  actions: {
    addPerson: function() {
      let newPerson = this.store.createRecord('person');
      this.get('model.persons').pushObject(newPerson);
    },
    removePerson(person) {
      person.deleteRecord();
    },
    submitOrder() {
      this.get('ajax').post('https://localhost:8443/submit-order', {
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({
          'insurancePolicy': this.get('model').serialize()
        }),
      }).then(response => {
        Ember.Logger.debug('response:', response);
        this.set('paymentRedirection', response.redirect);
      }).catch(() => {
        this.transitionToRoute('order-error');
      });
    }
  }
});
