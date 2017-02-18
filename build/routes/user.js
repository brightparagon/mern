'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    ACCOUNT SIGN UP: POST /api/user/signup
    BODY SAMPLE: {
      "email": "test",
      "name": "test",
      "password": "test",
    }
    ERROR CODES:
      1: BAD USERNAME
      2: BAD PASSWORD
      3: USERNAME EXISTS
*/
router.post('/signup', function (req, res) {
  // CHECK USERNAME FORMAT
  // 정규식 for Email 만들기
  // let usernameRegex = /^[a-z0-9]+$/;
  //
  // if(!usernameRegex.test(req.body.username)) {
  //   return res.status(400).json({
  //     error: "BAD USERNAME",
  //     code: 1,
  //   });
  // }

  // CHECK PASS LENGTH
  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // CHECK USER EXISTANCE
  _user2.default.findOne({ email: req.body.email }, function (err, exists) {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: "EMAIL EXISTS",
        code: 3
      });
    }

    // CREATE ACCOUNT
    var user = new _user2.default();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPassword(req.body.password);

    // SAVE IN THE DATABASE
    user.save(function (err, user) {
      if (err) throw err;
      // 여기서 로그인 유무 변수를 던져줘서 네비게이션을 통제
      var token = user.generateJwt();
      // 토큰을 만들었지만 프론트 프레임워크가 없기 때문에 지금은 필요가 없다 -> 직접 user 전달
      req.session.user = user;
      return res.json({ success: true });
      // res.render('profile', {user: req.session.user});
    });
  });
});

/*
    ACCOUNT SIGN IN: POST /api/user/signin
    BODY SAMPLE: {
      "email": "test",
      "password": "test",
    }
    ERROR CODES:
      1: SIGN IN FAILED
*/
router.post('/signin', function (req, res) {
  if (typeof req.body.password !== 'string') {
    return res.status(401).json({
      error: 'LOGIN FAILED',
      code: 1
    });
  }

  _passport2.default.authenticate('local', function (err, user, info) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      // const token = user.generateJwt();
      // req.session.user = user;
      req.session.signinInfo = {
        _id: user._id,
        email: user.email,
        name: user.name
      };

      // token을 쓰게 되면 token을 반환하면 된다
      return res.json({
        success: true
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
});

// module.exports.signOut = function(req, res, next) {
//   delete req.session.user;
//   res.redirect('/');
// };
//
// module.exports.profile = function(req, res, next) {
//   User.findById(req.query.userId).populate('posts')
//    .exec(function(err, user) {
//     if(err) return next(err);
//     res.render('profile', {user: user});
//   });
// };

exports.default = router;