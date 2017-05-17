const express = require('express');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;

const config = require('./config/config.js')

console.log(config)

passport.use(new Strategy({
  clientID: config.googleClientId,
  clientSecret: config.googleSecret,
  callbackURL: 'http://localhost:8000/auth/google/callback',
},
(assessToken, refreshToken, profile, cb) => {
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

app.use(passport.initialize());
app.use(passport.session());

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
    res.send('Log in succeeded!');
  });

app.get('/fail', (req, res) => {
  res.send('You failed at logging in.');
})

app.listen(8000);