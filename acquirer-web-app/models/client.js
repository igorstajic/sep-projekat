var mongoose = require('mongoose');

var schema = mongoose.Schema({
  merchantId: String,
  password: String
});

module.exports = mongoose.model('Client', schema);
