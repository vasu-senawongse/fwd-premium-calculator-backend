const BaseService = require('../services/BaseService');
module.exports = {
  async index(req, res) {
    try {
      res.send('Capco Test Express API V 1.0.0');
    } catch (error) {
      console.log(error);
    }
  },
  async getProduct(req, res) {
    try {
      const payload = req.body;
      const result = await BaseService.getProduct(payload);
      await BaseService.saveRecord(result);
      res.json(result.result);
    } catch (error) {
      console.log(error);
    }
  },
};
