// Put all routing for users here
const userRouter = require('express').Router();
const userUtils = require('../utils/userUtils.js')



// Create route handles for users

userRouter.route('/')
    /**
     * When would we need to return a list of all users?
     */
    .get((req, res) => {
        res.send('Returns a list of users.')
    })
    /**
     * Take a JSON object of user data
     */
    .post((req, res) => {
        res.send('Create a user')
    })

userRouter.route('/:userId')
    /**
     * Respond with different information if the request is made by the user, another user,
     * or someone who is not logged in?
     */
    .get((req, res) => {
        res.send(`Respond with data of user ${userId}`)
    })
    .put((req, res) => {
        res.send(`Update the profile of user ${userId}`)
    })
    .delete((req, res) => {
        res.send(`Delete user ${userId}`)
    });

module.exports = userRouter;
