import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  pan: [
    // Add number validation algorithm.
    validator('presence', true),
    validator('length', {
      lt: 19
    })
  ],
  securityCode: validator('presence', true),
  cardHolderName: validator('presence', true),
  expiryDate: validator('presence', true)
});
export default Model.extend(Validations,{
  pan: attr('number'),
  securityCode: attr('number'),
  cardHolderName: attr('string'),
  expiryDate: attr('string'),
  amount: attr('number'),
  errorUrl: attr('string')
});
