const messageRouter = require('express').Router();
const Message = require('../models/message');

messageRouter.route('/:userId')
  .post((req, res) => {
    const message = JSON.stringify(req.body.message);
    return new Message(JSON.parse(message)).save()
      .then((model) => {
        return model;
      });
  })
  .get((req, res) => {
    const userId = req.params.userId;
    new Message({ recipient_id: userId }).fetchAll()
      .then(model => {
        if (model) {
          res.send(model);
        } else {
          res.status(404).send();
        }
      });
  });

module.exports = messageRouter;
