const authRouter = require('express').Router();
const passport = require('passport');

const authHandlers = require('../handlers/authHandlers');

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

/**
 * Middleware function to redirect users after they have successfully
 * logged in or out.
 */

const recordReferer = (req, res, next) => {
  req.session.redirectTo = req.cookies.redirectTo;
  res.clearCookie('redirectTo');
  next();
};

authRouter.get('/auth/google', recordReferer, passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/facebook', recordReferer, passport.authenticate('facebook'));


authRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/fail' }),
  authHandlers.callbackHandler);

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail' }),
  authHandlers.callbackHandler);


authRouter.get('/auth/loggedIn', authHandlers.checkLoggedInHandler);

authRouter.get('/auth/logout', authHandlers.logoutHandler);

module.exports = authRouter;
