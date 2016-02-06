import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
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

  mainPolicy: belongsTo('insurance-policy')

});
