var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var schema = mongoose.Schema({
  acquirerOrderId: Number,
  acquirerTimestamp: Date,
  issuerOrderId: Number,
  issuerTimestamp: Date,
  status: String
});

schema.plugin(autoIncrement.plugin, {
  model: 'PaymentRecord',
  field: 'issuerOrderId'
});

module.exports = mongoose.model('PaymentRecord', schema);
