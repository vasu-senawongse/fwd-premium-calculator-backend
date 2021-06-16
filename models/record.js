const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordSchema = new Schema(
  {
    name: String,
    genderCd: String,
    dob: Date,
    planCode: String,
    premiumPerYear: Number,
    paymentFrequency: String,
    saPerYear: Number,
    result: Object,
  },
  { timestamps: true, versionKey: false }
);

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
