const GeoPoint = require('geopoint');
const Event = require('../models/event');

// Put all utility/helper functions for events here

/**
 * This function should grab an event and attendee data, comparing the
 * size of the event with the number of approved attendees, and update
 * the event accordingly. It mostly works, but reliably does not work
 * with event 79. User 165 doesn't show up as an attendee, though it
 * does on Workbench.
 *
 */

const updateEventFull = (eventId) => {
  new Event({ id: eventId }).fetch({ withRelated: 'users' })
    .then((model) => {
      const numSlots = model.get('needs');
      const related = model.related('users');
      // console.log('attendee id numbers:');
      // related.forEach((relatedModel) => {
      //   console.log(relatedModel.get('id'), relatedModel.pivot.get('flag'));
      // });
      const numApproved = related.filter(m => m.pivot.get('flag') === 'approved').length;
      // console.log('Number of approved people:')
      // console.log(numApproved);
      if (numApproved === numSlots) {
        // update model to be full
        model.save({ full: 1 }, { patch: true });
      } else if (numApproved < numSlots && model.get('full') === 1) {
        // ensure `full` is correct
        model.save({ full: 0 }, { patch: true });
      } else {
        // TODO Handle the case where too many people have been approved?
      }
    });
};

const boundingBox = (lat, lng, dist) => {
  const point = new GeoPoint(lat, lng);
  const bounds = point.boundingCoordinates(dist);
  return {
    lowerLat: Math.min(bounds[0].latitude(), bounds[1].latitude()),
    upperLat: Math.max(bounds[0].latitude(), bounds[1].latitude()),
    lowerLng: Math.min(bounds[0].longitude(), bounds[1].longitude()),
    upperLng: Math.max(bounds[0].longitude(), bounds[1].longitude()),
  };
};

module.exports = {
  updateEventFull,
  boundingBox,
};
