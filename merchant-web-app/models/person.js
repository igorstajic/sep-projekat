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

module.exports = mongoose.model('Person', schema);
