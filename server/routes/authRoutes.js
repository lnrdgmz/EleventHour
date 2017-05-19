
const routes = require('express').Router();
const passport = require('passport');


routes.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

routes.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: '/fail'}),
  (req, res) => {
    /**
     * Set some cookie data and send the appropriate response code
     */
    res.send(`Log in succeeded! Welcome, ${JSON.stringify(req.user)}`);
  });

routes.get('/auth/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('true');
  } else {
    res.send('false');
  }
});

routes.get('/auth/logout', (req, res) => {/* Log user out */});

module.exports = routes;
