import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {
  belongsTo, hasMany
}
from 'ember-data/relationships';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
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
  region: validator('presence', true),
  amountLimit: validator('presence', true),
  vehicleInsurance: validator('belongs-to'),
  homeInsurance: validator('belongs-to'),
  persons: validator('has-many')
});
export default Model.extend(Validations, {
  startDate: attr('date'),
  endDate: attr('date'),
  region: attr('string'),
  sport: attr('string'),
  amountLimit: attr('number'),

  vehicleInsurance: belongsTo('vehicle-insurance', {async: false}),
  homeInsurance: belongsTo('home-insurance', {async: false}),

  persons: hasMany('person', {async: false})
});
