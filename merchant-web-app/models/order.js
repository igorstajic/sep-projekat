var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = mongoose.Schema({
  orderId: Number,
  timestamp: Date,
  policy: {
    ref: 'Policy',
    type: ObjectId
  },
  amount: Number
});

schema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderId' });

module.exports = mongoose.model('Order', schema);
