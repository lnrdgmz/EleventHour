const db = require('../config/config');
const Event = require('../models/event');
const Attendee = require('../models/attendee.js')


module.exports = {

    createEvent : (req, res) => {
        const eventObj = req.body;
        if (!['title', 'description', 'date_time'].every(k => k in eventObj)) {
            res.status(400).send();
        } else {
        // Assumes the category field is an integer value referencing a category ID.
        eventObj.full = false;
        new Event(eventObj).save()
            .then( model => {
                console.log('New event', model.attributes);
                new Attendee({
                    event_id : parseInt(model.attributes.id),
                    user_id : req.session.user_id,
                    flag : 'creator'
                }).save()
            })
            .then( model => {
                res.send(model);
            });
        }
    },

    getEventList : (req, res) => {
     /*
     * takes a query param: page. Return 5 events at a time.
     * Increase to 50 once things are working.
     * 
     * Add a query param for category or tags? Return 50 events 
     * satisfying that search.
     */
        new Event().fetchPage({
            pageSize: 5,
            page: req.query.page || 1,
        })
        .then( models => {
            res.send(models);
        })
    },

    getEvent : (req, res) => {
        let eventId = req.params.eventId;
        Event.where('id', eventId).fetch({withRelated: ['users']})
            .then( model => {
                console.log(model)
                res.send(model);
            })
            .catch( err => console.error(err))
    },

    updateEvent : (req, res) => {
        Event.where('id' , req.params.eventId ).fetch()
            .then( model => {
                if(!model) {
                    res.status(404).send()
                } else {
                    return model.save(req.body, {patch: true})
                }
            })
            .then( model => {
                res.send(model);
            });
    },

    deleteEvent : (req, res) => {
        Event.where('id', parseInt(req.params.eventId)).fetch()
            .then( model => {
                if(!model) {
                    res.status(404).send();
                } else {
                    return model.destroy();
                }
            })
            .then( model => {
                res.send(model)
            });
    }

}