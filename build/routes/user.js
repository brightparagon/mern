'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.createUser = function (req, res, next) {
  var user = new _user2.default();
  user.email = req.body.email;
  user.name = req.body.name;
  user.facebook = req.body.facebook;
  user.setPassword(req.body.password);
  user.save(function (err, user) {
    if (err) return next(err);
    // 여기서 로그인 유무 변수를 던져줘서 네비게이션을 통제
    // var token;
    // token = user.generateJwt();
    var token = user.generateJwt();
    // 토큰을 만들었지만 프론트 프레임워크가 없기 때문에 지금은 필요가 없다 -> 직접 user 전달
    req.session.user = user;
    res.render('profile', { user: req.session.user });
  });
};

module.exports.signIn = function (req, res, next) {
  _passport2.default.authenticate('local', function (err, user, info) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      var token = user.generateJwt();
      req.session.user = user;
      res.render('profile', { user: req.session.user });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.signOut = function (req, res, next) {
  delete req.session.user;
  res.redirect('/');
};

module.exports.profile = function (req, res, next) {
  _user2.default.findById(req.query.userId).populate('posts').exec(function (err, user) {
    if (err) return next(err);
    res.render('profile', { user: user });
  });
};