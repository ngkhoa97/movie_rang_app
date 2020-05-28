const passportJWT = require('passport-jwt');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
// eslint-disable-next-line import/order
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = passportJWT;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

module.exports.controller = (app) => {
  // local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
      console.log(`${email} - ${password}`);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      User.comparePassword(password, user.password, (error, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
      return true;
    });
  }));
  // user login
  app.post('/users/login',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    (req, res) => {
      console.log(req.body);
      console.log('vao 2');
      res.redirect('/profile');
    });
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  app.get('/profile', (req, res) => {
    res.send(req.session);
  });


  // register a user
  app.post('/users/register', (req, res) => {
    const { name } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const newUser = new User({
      name,
      email,
      password,
    });
    User.createUser(newUser, (error, user) => {
      if (error) {
        console.log(error);
        res.status(422).json({
          message: 'Something went wrong. Please try again after some time!',
        });
      }
      res.send({ user });
    });
  });

  // login a user
/*  app.post('/users/login', (req, res) => {
    console.log('vao 1');
    if (req.body.email && req.body.password) {
      const { email } = req.body;
      const { password } = req.body;
      User.getUserByEmail(email, (err, user) => {
        if (!user) {
          res.status(404).json({ message: 'The user does not exist!' });
        } else {
          User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              const payload = { id: user.id };
              // eslint-disable-next-line no-undef
              const token = jwt.sign(payload, 'thisisthesecretkey');
              res.json({ message: 'ok', token });
            } else {
              res.status(401).json({ message: 'The password is incorrect!' });
            }
          });
        }
      });
    }
  }); */
};
