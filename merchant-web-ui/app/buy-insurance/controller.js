import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  regionList: ['Europe', 'Asia', 'Australia', 'North America', 'South America', 'Japan'],
  sportList: [{
    name: 'Skiing',
    cat: 3
  }, {
    name: 'Boxing',
    cat: 5
  }, {
    name: 'Gymnastics',
    cat: 4
  }, {
    name: 'Swimming',
    cat: 2
  }, {
    name: 'Golf',
    cat: 1
  }],
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
  didValidate: false,
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
      var model = this.get('model');
      model.validate().then(({
        model, validations
      }) => {
        this.set('didValidate', true);
        if (validations.get('isValid')) {
          this.set('isProcessing', true);
          this.get('ajax').post('https://localhost:8443/submit-order', {
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
              'insurancePolicy': this.get('model').serialize()
            }),
          }).then(response => {
            this.set('isProcessing', false);
            this.set('paymentRedirection', response.redirect);
          }).catch(() => {
            this.set('isProcessing', false);
            this.transitionToRoute('order-error');
          });
        } else {
          // Show error message?
        }
      });

    }
  }
});
