var mongoose = require('mongoose');

var schema = mongoose.Schema({
  pan: String,
  url: {type: String, lowercase: true}
});

module.exports = mongoose.model('Issuer', schema);
