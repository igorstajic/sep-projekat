var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  acquirerOrderId: Number,
  acquirerTimestamp: Date,
  payment: {
    ref: 'Payment',
    type: ObjectId
  },
});

schema.plugin(autoIncrement.plugin, { model: 'Transaction', field: 'acquirerOrderId' });

module.exports = mongoose.model('Transaction', schema);
