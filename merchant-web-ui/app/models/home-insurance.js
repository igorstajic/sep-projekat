import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
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

  mainPolicy: belongsTo('insurance-policy')

});
