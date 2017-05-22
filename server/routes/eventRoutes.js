// Put all routing for events here
const eventRouter = require('express').Router();
const eventUtils = require('../utils/eventUtils.js')

const Event = require('../models/event');

// Create route handles for events

eventRouter.route('/')
  .get((req, res) => {
    /**
     * takes a query param: page. Return 5 events at a time.
     * Increase to 50 once things are working.
     * 
     * Add a query param for category or tags? Return 50 events 
     * satisfying that search.
     */
    new Event().fetchPage({
      pageSize: 5, 
      page: req.query.page || 1,
      /**
       * withRelated property needed to pull creator info, but this
       * crashes the server
       */
      // withRelated: 'creator',
  })
    // new Event().fetchAll()
      .then(model => {
        // model.creator = model.related('creator');
        res.send(model)
      })
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
