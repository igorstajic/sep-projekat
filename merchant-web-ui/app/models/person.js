import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
import {
  belongsTo
}
from 'ember-data/relationships';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  idNumber: validator('presence', true),
  name: validator('presence', {
    presence: true
  }),
  lastName: validator('presence', true),
  email: validator('format', {
    type: 'email'
  }),
  address: validator('presence', true),
  phoneNumber: validator('presence', true),
  passportNumber: validator('presence', true),
});
export default Model.extend(Validations, {
  idNumber: attr('number'),
  name: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  ageCategory: attr('number'),
  address: attr('string'),
  phoneNumber: attr('string'),
  passportNumber: attr('number'),


  policy: belongsTo('insurance-policy'),

  fullName: Ember.computed('name', 'lastName', function() {
    return `${this.get('name') || ''} ${this.get('lastName') || ''}`;
  }),


});
