const { getProduct } = require('../services/BaseService');
const mongoose = require('mongoose');
require('dotenv').config();

it('should connect to Mongo DB', async () => {
  mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  setTimeout(function () {
    if (mongoose.connection.readyState == 1) {
      expect(mongoose.connection.readyState).toEqual(1);
    }
  }, 5000);
});

it('should be able to get Base Sum Assured from FWD', async () => {
  const result = await getProduct({
    name: 'TEST',
    genderCd: 'FEMALE',
    dob: '1983-02-21',
    planCode: 'T11A20',
    premiumPerYear: 30000,
    paymentFrequency: 'YEARLY',
  });
  const response =
    result.result && result.result.quotationProductList[0].baseSumAssured;
  // Assertion
  expect(response).toEqual(1205594);
});

it('should be able to get Base Annual Premium from FWD', async () => {
  const result = await getProduct({
    name: 'TEST',
    genderCd: 'FEMALE',
    dob: '1982-02-21',
    planCode: 'T11AM1',
    paymentFrequency: 'YEARLY',
    saPerYear: 500000,
  });
  const response =
    result.result && result.result.quotationProductList[0].baseAnnualPremium;
  // Assertion
  expect(response).toEqual(57840);
});
