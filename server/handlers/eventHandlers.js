const moment = require('moment');
const db = require('../config/config');
const Event = require('../models/event');
const Attendee = require('../models/attendee.js');
const eventUtils = require('../utils/eventUtils');
const mail = require('../utils/mail');

module.exports = {

  createEvent: (req, res) => {
    console.log('Create Event:', req.body);
    const eventObj = req.body;
    if (!['title', 'description', 'date_time'].every(k => k in eventObj)) {
      console.log('Incomplete form');
      console.log(eventObj);
      res.status(400).send();
    } else {
      const { lat, lng } = eventObj.geoData || { lat: null, lng: null };
      eventObj.lat = lat;
      eventObj.lng = lng;
      eventObj.full = false;
      eventObj.img_url = "http://i.dailymail.co.uk/i/pix/2016/06/20/05/3578969600000578-3649871-image-m-59_1466395548625.jpg";
      eventObj.habitat = "outdoors";
      console.log(eventObj);
      return new Event(eventObj).save()
        .then((model) => {
          console.log('New event', model.attributes);
          new Attendee({
            event_id: parseInt(model.attributes.id, 10),
            user_id: req.session.user_id,
            flag: 'creator',
          }).save();
          return model;
        })
        .then((model) => {
          res.send(model);
        })
        .catch((err) => {
          console.error('Event Creation Failed:', err);
        });
    }
  },

  getEventList: (req, res) => {
    /**
     * takes the following query params:
     * page: returns the next page of results
     * lat,
     * lng,
     * dist: Latitude, longitude, and distance, for limiting by proximity
     *
     * Add a query param for category or tags? Return 50 events
     * satisfying that search.
     */

    // Calculates boundries based on geo-data, if available.
    const { lat, lng, dist } = req.query;
    const bounds = lat && lng && dist
    ? eventUtils.boundingBox(parseFloat(lat), parseFloat(lng), parseFloat(dist))
    : undefined;

    new Event().where({ full: 0 })
      .query(((qb) => {
        if (bounds) {
          qb.where('lat', '<', bounds.upperLat)
            .andWhere('lat', '>', bounds.lowerLat)
            .andWhere('lng', '<', bounds.upperLng)
            .andWhere('lng', '>', bounds.lowerLng)
            .andWhere('date_time', '>', `'${moment.utc().format().replace('T', ' ')}'`);
        } else {
          qb.where('date_time', '>', `'${moment.utc().format().replace('T', ' ')}'`);
        }
      }))
      .orderBy('date_time', 'ASC')
      .fetchPage({
        pageSize: 10,
        page: req.query.page || 1,
      })
      .then((models) => {
        console.log(req.query.page);
        res.send(models);
      });
  },

/**
 * getEvent should respond with attendee data, but the models are broken
 * and the query cannot be run with `{ withRelated: 'users' }`
 */

  getEvent: (req, res) => {
    const eventId = req.params.eventId;
    Event.where('id', eventId).fetch({ withRelated: 'users' })
      .then((model) => {
        res.send(model);
      })
      .catch(err => console.error('There has been a terrible error: ----------', err));
  },

  updateEvent: (req, res) => {
    Event.where('id', req.params.eventId).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        } else {
          return model.save(req.body, { patch: true });
        }
      })
      .then((model) => {
        res.send(model);
      });
  },

  deleteEvent: (req, res) => {
    Event.where('id', parseInt(req.params.eventId, 10)).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model.destroy();
      })
      .then((model) => {
        Attendee.where('event_id', parseInt(req.params.eventId, 10)).fetchAll()
          .then((attendees) => {
            if (!attendees) res.status(404).send();
            return attendees.invokeThen('destroy')
              .then(arr => res.send({ event: model, arr }));
          });
      });
  },

  joinEvent: (req, res) => {
    console.log('Event_id', req.params.eventId);
    console.log('User_id', req.body.id);
    new Attendee({
      event_id: parseInt(req.params.eventId, 10),
      user_id: parseInt(req.body.id, 10),
      flag: 'pending',
    })
    .save()
    .then((model) => {
      mail.emailCreator(req.params.eventId, req.body.userId);
      res.send(model);
    })
    .catch(err => console.error(err));
  },

  editAttendees: (req, res) => {
    const { id, flag } = req.body;
    new Attendee({ id }).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model.save({ flag }, { patch: true });
      })
      .then((updatedAtt) => {
        eventUtils.updateEventFull(updatedAtt.get('event_id'));
        if (updatedAtt.get('flag') === 'approved') {
          mail.emailApprovedUser(updatedAtt.get('user_id'), updatedAtt.get('event_id'));
        }
        return updatedAtt;
      })
      .then((model) => {
        res.send(model);
      });
  },

  deleteAttendee: (req, res) => {
    const model = req.body;
    new Attendee(model).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model.destroy();
      })
      .then(model => res.send(model));
  },
};
