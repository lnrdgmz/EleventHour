const moment = require('moment');
const User = require('../models/user');

const logoutHandler = (req, res) => {
  req.session.destroy((err) => {
    res.status(500).send(err);
  });
  const redirectUrl = req.cookies.redirectTo;
  Object.keys(req.cookies).forEach(cookie => res.clearCookie(cookie));
  res.redirect(redirectUrl);
};

const checkLoggedInHandler = (req, res) => {
  if (req.isAuthenticated()) {
    new User({ id: req.session.user_id }).fetch({ withRelated: 'events' })
      .then((model) => {
        res.send(model);
      });
  } else {
    res.send('false');
  }
};

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
        userObj.set({
          display_name: req.user.displayName,
          email: req.user.emails ? req.user.emails[0].value : null,
        }).save()
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

module.exports = {
  callbackHandler,
  checkLoggedInHandler,
  logoutHandler,
};
