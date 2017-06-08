const User = require('../models/user');

const editUserHandler = (req, res) => {
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
      res.send(model);
    });
};

const getUserHandler = (req, res) => {
  new User({ id: req.params.userId }).fetch()
    .then((model) => {
      if (model) {
        res.send(model);
      } else {
        res.status(404).send();
      }
    });
};

const deleteUserHandler = (req, res) => {
  new User({ id: req.params.user_id }).fetch()
    .then((model) => {
      if (!model) {
        res.status(404).send();
      } else {
        return model;
      }
    })
    .then((model) => {
      return model.destroy();
    })
    .then((model) => {
      res.send(model);
    });
};

module.exports = {
  deleteUserHandler,
  editUserHandler,
  getUserHandler,
};
