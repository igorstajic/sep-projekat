var mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleInsurance = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  towingServices: Number, // Number of max kilometers.
  repairServices: Number, // Covering expenses up to this amount.
  hotelAccomodation: Number, // number of days.
  alternativeTransport: Boolean,
  // Non-billable information.
  vehicleType: String,
  yearManufactured: Number,
  registrationNumber: String,
  chassisNumber: String,
  ownerFullName: String,
  ownerJMBG: Number
});

const homeInsurance = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  estimatedValue: Number,
  area : Number,
  age: Number,
  // Insurance types.
  fire: Boolean,
  flood: Boolean,
  burglary: Boolean,
  // Non-billable information.
  address: Number,
  ownerFullName: String,
  ownerJMBG: Number
});

var person = mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    lowercase: true
  },
  ageCategory: Number, // 1: < 18 | 2: 18-60 | 3:  > 60
  jmbg: Number,
  passport: Number,
  address: String,
  phone: Number
});

const schema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  region: String,
  persons: [person],
  sport: String,
  amountLimit: Number,
  vehicleInsurance: vehicleInsurance,
  homeInsurance: homeInsurance
});

module.exports = mongoose.model('Policy', schema);
