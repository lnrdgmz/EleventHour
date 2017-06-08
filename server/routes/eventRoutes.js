// Put all routing for events here
const eventRouter = require('express').Router();
const eventHandlers = require('../handlers/eventHandlers.js');

eventRouter.route('/')
  .get(eventHandlers.getEventList)
  .post(eventHandlers.createEvent);

eventRouter.route('/join/:eventId')
  .post(eventHandlers.joinEvent);

eventRouter.route('/attendees')
  .put(eventHandlers.editAttendees)
  .delete(eventHandlers.deleteAttendee);

eventRouter.route('/:eventId')
  .get(eventHandlers.getEvent)
  .put(eventHandlers.updateEvent)
  .delete(eventHandlers.deleteEvent);


module.exports = eventRouter;
