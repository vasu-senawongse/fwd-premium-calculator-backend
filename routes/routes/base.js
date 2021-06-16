const BaseController = require('../../controllers/BaseController');
module.exports = (app) => {
  app.get('/', BaseController.index);
  app.post('/get-product', BaseController.getProduct);
};
