var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  paymentId: Number,
  amount: Number,
  merchantOrderId: Number,
  errorUrl: {
    type: String,
    lowercase: true
  },
  client: {
    ref: 'Client',
    type: ObjectId
  },
});

schema.plugin(autoIncrement.plugin, {
  model: 'Payment',
  field: 'paymentId'
});

module.exports = mongoose.model('Payment', schema);
