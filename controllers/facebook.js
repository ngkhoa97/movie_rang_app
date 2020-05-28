const passport = require('passport');
const { Strategy } = require('passport-facebook');
const User = require('../models/User.js');
const config = require('../config/Config');

module.exports.controller = (app) => {
// facebook strategy
  passport.use(new Strategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: '/login/facebook/return',
    profileFields: ['id', 'displayName', 'email'],
  },
  (accessToken, refreshToken, profile, cb) => {
    const email = profile.emails[0].value;
    User.getUserByEmail(email, (err, user) => {
      if (!user) {
        const newUser = new User({
          fullname: profile.displayName,
          email,
          facebookId: profile.id,
        });
        User.createUser(newUser, (error) => {
          if (error) {
            // Handle error
          }
          return cb(null, user);
        });
      } else {
        return cb(null, user);
      }
      return true;
    });
    // Handle facebook login
  }));

  app.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));
  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    });
};
