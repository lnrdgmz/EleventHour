const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:8000/auth/google/callback',
},
(assessToken, refreshToken, profile, cb) => {
  /** 
   * TODO Find or create DB entry for user here
  */
  return cb(null, profile);
}));

/** 
 * Edit this when implementing a user database?
 */
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj)
});

module.exports = (app) => {
  app.use(session( { secret: 'gibson-43-chicken-dickens' } ));
  app.use(passport.initialize());
  app.use(passport.session());
};