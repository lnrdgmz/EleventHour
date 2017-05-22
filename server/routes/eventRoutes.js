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
    /*
     * TODO Same code as user PUT endpoint. Refactor.
     */
    new Event({id: req.params.eventId}).fetch()
      .then(model => {
        if (!model) {
          res.status(404).send();
        } else {
          return model;
        }
      })
      .then(model => {
        return model.save(req.body, {patch: true});
      })
      .then(model => {
        res.send(model)
      })
  })
  .delete((req, res) => {
    new Event({id: req.params.eventId}).fetch()
      .then(model => {
        if (!model) {
          res.status(404).send();
        } else {
          return model;
        }
      })
      .then(model => {
        return model.destroy();
      })
      .then(model => {
        res.send(model);
      })
  });


module.exports = eventRouter;
