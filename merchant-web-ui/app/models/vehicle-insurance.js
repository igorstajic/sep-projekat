import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {
  belongsTo
}
from 'ember-data/relationships';
import Ember from 'ember';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  ownerIdNumber: [
    validator('presence', true),
    validator('length', {
      is: 13
    })
  ],
  ownerFullName: validator('presence', {
    presence: true
  }),
  startDate: {
    description: 'Start date',
    validators: [
      validator('presence', true),
      validator('date', {
        before: 'now',
        format: 'M/D/YYYY'
      })
    ]
  },
  endDate: {
    description: 'End date',
    validators: [
      validator('presence', true),
      validator('date', {
        before: 'now',
        format: 'M/D/YYYY'
      })
    ]
  },
  isValidPolicy: validator('is-true'),
  vehicleType: validator('presence', true),
  registrationNumber: validator('presence', true),
  yearManufactured: validator('number', {
    allowString: true,
    integer: true,
    gt: 1990
  }),
  chassisNumber: validator('presence', true)
});

export default Model.extend(Validations, {
  ownerFullName: attr('string'),
  ownerIdNumber: attr('number'),

  startDate: attr('date'),
  endDate: attr('date'),

  towingServices: attr('boolean'),
  repairServices: attr('boolean'),
  hotelAccomodation: attr('boolean'),
  alternativeTransport: attr('boolean'),

  vehicleType: attr('string'),
  yearManufactured: attr('number'),
  registrationNumber: attr('string'),
  chassisNumber: attr('string'),

  mainPolicy: belongsTo('insurance-policy'),

  isValidPolicy: Ember.computed.or('towingServices', 'repairServices', 'hotelAccomodation', 'alternativeTransport')
});
