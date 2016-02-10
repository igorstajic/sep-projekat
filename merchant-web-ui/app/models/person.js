import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {
  belongsTo
}
from 'ember-data/relationships';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  idNumber: [
    validator('presence', true),
    validator('length', {
      is: 13
    })
  ],
  birthDate: {
    description: 'Start date',
    validators: [
      validator('presence', true),
      validator('date', {
        before: 'now'
      })
    ]
  },
  name: validator('presence', {
    presence: true
  }),
  email: [
    validator('format', {
      type: 'email',
      dependentKeys: ['isInsuranceHolder'],
      disabled() {
        return !this.get('model.isInsuranceHolder');
      }
    }),
    validator('presence', {
      presence: true,
      dependentKeys: ['isInsuranceHolder'],
      disabled() {
        return !this.get('model.isInsuranceHolder');
      }
    })
  ],
  address: validator('presence', true),
  phoneNumber: validator('presence', true),
  passportNumber: [
    validator('presence', true),
    validator('length', {
      gt: 5
    })
  ],
});
export default Model.extend(Validations, {
  idNumber: attr('number'),
  name: attr('string'),
  email: attr('string'),
  birthDate: attr('number'),
  address: attr('string'),
  phoneNumber: attr('string'),
  passportNumber: attr('number'),
  isInsuranceHolder: attr('boolean'),


  policy: belongsTo('insurance-policy')


});
