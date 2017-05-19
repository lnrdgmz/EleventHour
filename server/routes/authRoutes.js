// Put all routing for authentication here
const authRouter = require('express').Router();
const passport = require('passport');



// Create route handles for Google and Fb authentication

authRouter.get('/facebook', passport.authenticate('facebook'))

authRouter.get('/facebook/login', 
        passport.authenticate({
            failureRedirect: '/login'
        }), 
        (req, res) => {
            console.log('Log in succeeded! Welcome!');
            // redirect to page they wanted to go to
        });



module.exports = authRouter;