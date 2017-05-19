// Put all routing for users here
const userRouter = require('express').Router();
const userUtils = require('../utils/userUtils.js')



// Create route handles for users

userRouter.route('/')
    .get((req, res) => {
        //return users
    })
    .post((req, res) => {
        //create user
    })

userRouter.route('/:userId')
    .put((req, res) => {
        //update user
    })
    .delete((req, res) => {
        //delete event
    });


module.exports = userRouter;

