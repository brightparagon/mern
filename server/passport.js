import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import User from './models/user';
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  function(email, password, done) {
    User.findOne({email: email}).populate('posts').exec(function(err, user) {
      if(err) return done(err);
      if(!user) {
        return done(null, false, {
          message: 'User not found',
        });
      }
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong',
        });
      }
      return done(null, user);
    });
  }
));
