var mongoose = require('mongoose');

var schema = mongoose.Schema({
  accountNumber: Number,
  cardNumber: Number,
  balance: Number
});

module.exports = mongoose.model('Account', schema);
