'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = _passportLocal2.default.Strategy;

_passport2.default.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  // User.findOne({email: email}).populate('posts').exec(function(err, user) {
  _user2.default.findOne({ email: email }).exec(function (err, user) {
    if (err) return done(err);
    if (!user) {
      // 처번째 인자가 err
      // 세번째 인자가 info
      return done(null, false, {
        message: 'User not found'
      });
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    }
    return done(null, user);
  });
}));