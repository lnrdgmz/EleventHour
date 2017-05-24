const authRouter = require('express').Router();
const passport = require('passport');
const moment = require('moment');

const User = require('../models/user');

/**
 * Check if a user is logged in by making a GET request to
  * /auth/loggedIn. If logged in, returns a JSON object with user's
  * data and events. If not logged it, responds with 'false'.
  *
  * Users can login via /auth/google or /auth/facebook
  *
  * After a successful login, the following cookies will be written:
  *  user_id: Number
  *  displayName: String
  *  events: an array of { event_id, user_role }
  *
  */

  const callbackHandler = (req, res) => {
    /**
     * Set some cookie data and send the appropriate response code
     */
    const userObj = new User({
      oauth_provider: req.user.provider,
      provider_id: req.user.id,
    });
    userObj.fetch({ withRelated: 'events' })
      .then((model) => {
        const maxAge = (moment.duration(7, 'days')).asMilliseconds();
        if (model) {
          req.session.user_id = model.get('id');
          req.session.cookie.maxAge = maxAge;
          const eventsCookieValue = [];
          model.related('events').forEach((event) => {
            const pivot = event.parse(event.pivot.attributes);
            eventsCookieValue.push({ id: event.get('id'), role: pivot.flag });
          });
          res.cookie('userId', model.get('id'), { maxAge });
          res.cookie('displayName', model.get('display_name'), { maxAge });
          res.cookie('events', eventsCookieValue, { maxAge });
          res.redirect(req.session.redirectTo || '/');
        } else {
          userObj.set({ display_name: req.user.displayName }).save()
            .then((model) => {
              req.session.user_id = model.get('id');
              req.session.cookie.maxAge = maxAge;
              res.cookie('userId', model.get('id'), { maxAge });
              res.cookie('displayName', model.get('display_name'), { maxAge });
              // res.send(`Added ${JSON.stringify(model)} to the database`);
              res.redirect(req.session.redirectTo || '/');
            });
        }
      });
  };

  const recordReferer = (req, res, next) => {
    req.session.redirectTo = req.get('Referer');
    next();
  };

  authRouter.get('/auth/google', recordReferer, passport.authenticate('google', { scope: ['profile'] }));
  authRouter.get('/auth/facebook', recordReferer, passport.authenticate('facebook'));


  authRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/fail' }),
    callbackHandler);

  authRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/fail' }),
    callbackHandler);

  authRouter.get('/auth/loggedIn', (req, res) => {
    if (req.isAuthenticated()) {
      new User({ id: req.session.user_id }).fetch({ withRelated: 'events' })
        .then(model => {
          res.send(model);
        });
    } else {
    res.send('false');
  }
});

authRouter.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    res.status(500).send();
  });
  console.log(req.cookies);
  Object.keys(req.cookies).forEach(cookie => res.clearCookie(cookie));
  // res.clearCookie('userId', 'displayName', 'events')
  res.redirect('/');
});

module.exports = authRouter;
