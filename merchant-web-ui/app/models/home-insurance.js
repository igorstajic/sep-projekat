import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
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
  homeAddress: validator('presence', true),
  homeArea: validator('number', {
    allowString: true,
    integer: true,
    gte: 10
  }),
  homeAge: validator('number', {
    allowString: true,
    integer: true,
    gte: 0,
    lt: 100
  }),
  homeValueEstimate: validator('number', {
    allowString: true,
    integer: true,
    gte: 0,
    lt: 100
  }),
  chasisNumber: validator('presence', true)
});
export default Model.extend(Validations,{
  ownerFullName: attr('string'),
  ownerIdNumber: attr('number'),

  startDate: attr('date'),
  endDate: attr('date'),
  homeValueEstimate: attr('number'),
  homeAddress: attr('string'),
  homeArea: attr('number'),
  homeAge: attr('number'),

  fireInsurance: attr('boolean'),
  floodInsurance: attr('boolean'),
  burglaryInsurance: attr('boolean'),

  mainPolicy: belongsTo('insurance-policy'),

  isValidPolicy: Ember.computed.or('fireInsurance', 'floodInsurance', 'burglaryInsurance')

});
