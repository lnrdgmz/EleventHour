// Put all routing for events here
const eventRouter = require('express').Router();
const eventUtils = require('../utils/eventUtils.js')

const Event = require('../models/event');

// Create route handles for events

eventRouter.route('/')
  .get((req, res) => {
    //return events
  })
  .post((req, res) => {
    const eventObj = req.body;
    if (!['creator_id', 'title', 'description', 'date_time'].every(k => k in eventObj)) {
      res.status(400).send();
    } else {
      new Event(eventObj).save()
        .then(model => {
          res.send(model);
        })
    }
  });

eventRouter.route('/:eventId')
  .put((req, res) => {
    //return events
  })
  .delete((req, res) => {
    //return events
  });


module.exports = eventRouter;
