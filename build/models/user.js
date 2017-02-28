'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  email: String,
  name: String,
  hash: String,
  salt: String,
  posts: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.methods.setPassword = function (password) {
  this.salt = _crypto2.default.randomBytes(16).toString('hex');
  this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function (password) {
  var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  // 이 generateJwt 함수는 회원가입 그리고 로그인 이후에 인증된 사용자 정보를 token을 만들어 여기에 담는 역할을 한다
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // 현재 시점 기준으로 일주일간 유효
  return _jsonwebtoken2.default.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'mernblog');
};

exports.default = _mongoose2.default.model('User', userSchema);