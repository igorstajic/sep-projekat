var mongoose = require('mongoose');

var schema = mongoose.Schema({
  accountNumber: Number,
  cardNumber: Number,
  balance: Number,
  reserved: Number
});

module.exports = mongoose.model('Account', schema);
