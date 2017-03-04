'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const jwt from 'express-jwt';
// const auth = jwt({
//   secret: 'mernblog',
//   userProperty: 'payload'
// });

var router = _express2.default.Router();

router.use('/*', function (req, res, next) {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});

// DATA FOR USER
router.use('/user', _user2.default);
router.use('/post', _post2.default);

exports.default = router;