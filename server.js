const express = require('express');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const config = require('./config/config.js')

passport.use(new Strategy({
  clientID: config.googleClientId,
  clientSecret: config.googleSecret,
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


const app = express();

app.use(session( { secret: 'gibson-43-chicken-dickens' } ));
app.use(passport.initialize());
app.use(passport.session());

const restrict = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send(`You're not logged in.`);
  }
};


app.get('/', (req, res) => {
  res.send('hello')
});

app.get('/login', (req, res) => {
  res.redirect('/auth/google')
})

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: '/fail'}),
  (req, res) => {
    res.send(`Log in succeeded! Welcome, ${JSON.stringify(req.user)}`);
  });

app.get('/fail', (req, res) => {
  res.send('You failed at logging in.');
})



app.get('/protected',
  restrict,
  (req, res) => {
      res.send(`Super secret content for ${req.user.displayName}`);
  });

app.listen(8000);