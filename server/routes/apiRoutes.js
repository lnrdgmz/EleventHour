const apiRouter = require('express').Router();
const apiHandlers = require('../handlers/apiHandlers.js')

apiRouter.route('/geocode')
   .get(apiHandlers.getGeocode);

module.exports = apiRouter;