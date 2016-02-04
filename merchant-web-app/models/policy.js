var mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleInsurance = mongoose.Schema({
  timePeriod: Date,
  towingServices: Number, // Number of max kilometers.
  repairServices: Number, // Covering expenses up to this amount.
  hotelAccomodation: Number, // number of days.
  alternativetransport: Boolean,
  // Non-billable information.
  vehicleType: String,
  yearManufactured: Number,
  regisrationNumber: String,
  chassisNumber: String,
  ownerFullName: String,
  ownerJMBG: Number
});

const homeInsurance = mongoose.Schema({
  timePeriod: Date,
  estimatedValue: Number,
  area : Number,
  age: Number,
  // Insurance types.
  fire: Boolean,
  flood: Boolean,
  burglary: Boolean,
  glassBreaking: Boolean,
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
  adderess: String,
  phone: Number
});

const schema = mongoose.Schema({
  timePeriod: Date,
  region: String,
  persons: [person],
  sport: String,
  amountLimit: Number,
  vehicleInsurance: vehicleInsurance,
  homeInsurance: homeInsurance
});

module.exports = mongoose.model('Policy', schema);
