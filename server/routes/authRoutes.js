const authRouter = require('express').Router();
const passport = require('passport');

const User = require('../models/user');


authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/auth/facebook', passport.authenticate('facebook'))


authRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/fail' }),
  (req, res) => {
    /**
     * Set some cookie data and send the appropriate response code
     */
    const user = {
      oauth_provider: req.user.provider,
      provider_id: req.user.id,
    };

    const userObj = new User(user);

    userObj.fetch()
      .then(model => {
        console.log(`Searched for ${JSON.stringify(userObj)}`)
        console.log(`and got ${JSON.stringify(model)}`)
        if (model) {
          res.send(`Found ${JSON.stringify(model)} in the database`);
        } else {
          // add necessary attributes to the user
          userObj.set({display_name: req.user.displayName}).save()
            .then(model => {
              res.send(`Added ${JSON.stringify(model)} to the database`);
            })

        }
      })

    // res.send(`Log in succeeded! Welcome, ${JSON.stringify(req.user)}`);
  });

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail' }),
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

authRouter.get('/auth/logout', (req, res) => {/* Log user out */ });

module.exports = authRouter;
