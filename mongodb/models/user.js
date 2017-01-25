var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  facebook: String,
  hash: String,
  salt: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  // 이 generateJwt 함수는 회원가입 이후 그리고 로그인 이후에 인증된 사용자 정보를 token을 만들어 여기에 담는 역할을 한다
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    facebook: this.facebook,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'mernblog');
};

module.exports = mongoose.model('User', userSchema);
