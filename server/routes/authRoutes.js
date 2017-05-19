const authRouter = require('express').Router();
const passport = require('passport');


authRouter.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
authRouter.get('/auth/facebook', passport.authenticate('facebook'))


authRouter.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: '/fail'}),
  (req, res) => {
    /**
     * Set some cookie data and send the appropriate response code
     */
    res.send(`Log in succeeded! Welcome, ${JSON.stringify(req.user)}`);
  });

authRouter.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/fail'}), 
  (req, res) => {
    /*  
     * Set some cookie data and send the appropriate response code
     */
    res.send(`Log in succeeded! Welcome, ${JSON.stringify(req.user)}`);
  });


authRouter.get('/auth/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('true');
  } else {
    res.send('false');
  }
});

authRouter.get('/auth/logout', (req, res) => {/* Log user out */});

module.exports = authRouter;
