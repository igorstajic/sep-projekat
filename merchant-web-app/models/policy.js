var mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const schema = mongoose.Schema({
  timePeriod: Date,
  region: String,
  persons: [{
    ref: 'Person',
    type: ObjectId
  }],
  sport: String,
  amountLimit: Number
});

module.exports = {
  model: mongoose.model('Policy', schema),
  resource: {
    urlTemplates: {
      'self': '/policies/{id}',
      'relationship': '/policies/{ownerId}/relationships/{path}'
    },
  }
};
