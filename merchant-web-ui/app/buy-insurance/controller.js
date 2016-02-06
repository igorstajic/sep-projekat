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
  isProcessing: false,
  addVehicleInsuranceDisabled: Ember.computed('model.homeInsurance', function() {
    if (this.get('model.homeInsurance')) {
      return 'true';
    }
    return '';
  }),
  actions: {
    addPerson: function() {
      let newPerson = this.store.createRecord('person');
      this.get('model.persons').pushObject(newPerson);
    },
    removePerson(person) {
      person.deleteRecord();
    },
    addHomeInsurance: function() {
      this.set('model.homeInsurance', this.store.createRecord('home-insurance'));
    },
    removeHomeInsurance() {
      this.get('model.homeInsurance').deleteRecord();
    },
    addVehicleInsurance: function() {
      this.set('model.vehicleInsurance', this.store.createRecord('vehicle-insurance'));
    },
    removeVehicleInsurance() {
      this.get('model.vehicleInsurance').deleteRecord();
    },
    submitOrder() {
      this.toggleProperty('isProcessing');
      this.get('ajax').post('https://localhost:8443/submit-order', {
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({
          'insurancePolicy': this.get('model').serialize()
        }),
      }).then(response => {
        this.toggleProperty('isProcessing');
        this.set('paymentRedirection', response.redirect);
      }).catch(() => {
        this.transitionToRoute('order-error');
      });
    }
  }
});
