var mongoose = require('mongoose');
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

schema.plugin(autoIncrement.plugin, 'Order');

module.exports = mongoose.model('Order', schema);
