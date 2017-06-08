// Put all routing for users here
const userRouter = require('express').Router();
const userHandlers = require('../handlers/userHandlers');

userRouter.route('/')
  .put(userHandlers.editUserHandler);

userRouter.route('/:userId')
  .get(userHandlers.getUserHandler)
  .delete(userHandlers.deleteUserHandler);

module.exports = userRouter;
