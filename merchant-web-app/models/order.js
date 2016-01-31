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

module.exports = {
  model: mongoose.model('Order', schema),
  resource: {
    urlTemplates: {
      'self': '/orders/{id}',
      'relationship': '/orders/{ownerId}/relationships/{path}'
    },
  }
};
