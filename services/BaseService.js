const api = require('axios');
const Record = require('../models/record');
module.exports = {
  async getProduct(payload) {
    try {
      const data = {
        genderCd: payload.genderCd,
        dob: payload.dob,
        planCode: payload.planCode,
        premiumPerYear: payload.premiumPerYear,
        paymentFrequency: payload.paymentFrequency,
        saPerYear: payload.saPerYear,
      };
      var result = await api.post(
        'https://api.fwd.co.th/dev-ecommerce/getProduct',
        data
      );

      var model = {
        name: payload.name,
        genderCd: data.genderCd,
        dob: data.dob,
        planCode: data.planCode,
        premiumPerYear: data.premiumPerYear,
        paymentFrequency: data.paymentFrequency,
        saPerYear: data.saPerYear,
        result: result.data,
        flag: result == null ? false : true,
      };
      return model;
    } catch (error) {
      console.log(error);
    }
  },

  async saveRecord(model) {
    try {
      const record = new Record(model);
      record.save();
      return record ? true : false;
    } catch (error) {
      console.log(error);
    }
  },
};
