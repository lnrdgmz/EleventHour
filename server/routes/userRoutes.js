// Put all routing for users here
const userRouter = require('express').Router();
const userUtils = require('../utils/userUtils.js');

const User = require('../models/user');

// Create route handles for users

userRouter.route('/')
  .put((req, res) => {
    console.log('This is in req.body:')
    console.log(req.body)
    if (!req.session.user_id) res.status(403).send();

    new User({ id: req.session.user_id }).fetch()
      .then((model) => {
        if (!model) {
          res.status(404).send();
        }
        return model;
      })
      .then((model) => {
        return model.save(req.body, { patch: true });
      })
      .then((model) => {
        console.log('This is what the db returned')
        console.log(model.attributes)
        res.send(model);
      });
  });

userRouter.route('/:userId')
  /**
   * Respond with different information if the request is made by the user, another user,
   * or someone who is not logged in?
   */

  .get((req, res) => {
      new User({id: req.params.userId}).fetch()
        .then(model => {
          if (model) {
            res.send(model);
          } else {
            res.status(404).send();
          }
        })
  })
  .delete((req, res) => {
    new User({ id: req.params.user_id }).fetch()
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

module.exports = userRouter;
