const paymentApi = require('./paymentRoutes');

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;