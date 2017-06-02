const apiRouter = require('express').Router();
const apiHandlers = require('../handlers/apiHandlers.js')

apiRouter.route('/geocode')
   .get(apiHandlers.getGeocode);

apiRouter.route('/weather')
  .get(apiHandlers.getWeather);
module.exports = apiRouter;