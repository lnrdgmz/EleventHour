<<<<<<< HEAD
=======
// Put all routing for user skill and peer ratings here// Put all routing for events here
>>>>>>> refactor($server): Routes skeleton
const ratingRouter = require('express').Router();
const ratingUtils = require('../utils/ratingUtils.js')


// Create route handles user ratings

ratingRouter.route('/')
    .get((req, res) => {
        //return ratings
    })
    .post((req, res) => {
        //return ratings
    })
ratingRouter.route('/:ratingId')
    .put((req, res) => {
        //return ratings
    })
    .delete((req, res) => {
        //return ratings
    });



<<<<<<< HEAD
module.exports = ratingRouter;
=======
module.exports = ratingRouter;
>>>>>>> refactor($server): Routes skeleton
