// require all middleware here
const authRoutes = require('../routes/authRoutes');

module.exports = (app, express) => {
  app.use(authRoutes);
}
