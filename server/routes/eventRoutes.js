// Put all routing for events here
const eventRouter = require('express').Router();
const eventUtils = require('../utils/eventUtils.js')


// Create route handles for events

eventRouter.route('/')
    .get((req, res) => {
        //return events
    })
    .post((req, res) => {
        //return events
    });


eventRouter.route('/:eventId')
    .put((req, res) => {
        //return events
    })
    .delete((req, res) => {
        //return events
    });


module.exports = eventRouter;
