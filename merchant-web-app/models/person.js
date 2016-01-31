var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true
  },
  jmbg: Number,
  passport: Number,
  adderess: String,
  phone: Number
});

module.exports = {
  model: mongoose.model('Person', schema),
  resource: {
    urlTemplates: {
      'self': '/persons/{id}',
      'relationship': '/persons/{ownerId}/relationships/{path}'
    },
  }
};
