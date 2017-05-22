const authRouter = require('express').Router();
const passport = require('passport');

const User = require('../models/user');

const callbackHandler = (req, res) => {
  /**
   * Set some cookie data and send the appropriate response code
   */
  const userObj = new User({
    oauth_provider: req.user.provider,
    provider_id: req.user.id,
  });
  userObj.fetch()
    .then(model => {
      if (model) {
        res.send(`Found ${JSON.stringify(model)} in the database`);
      } else {
        userObj.set({display_name: req.user.displayName}).save()
          .then(model => {
            res.send(`Added ${JSON.stringify(model)} to the database`);
          })
      }
    })
}

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/auth/facebook', passport.authenticate('facebook'))


authRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/fail' }),
  callbackHandler);

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail' }),
  callbackHandler);

authRouter.get('/auth/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('true');
  } else {
    res.send('false');
  }
});

authRouter.get('/auth/logout', (req, res) => {/* Log user out */ });

module.exports = authRouter;
