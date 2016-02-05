import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    persons: { embedded: 'always' },
    homeInsurance: { embedded: 'always' },
    vehicleInsurance: { embedded: 'always' }

  }
});
