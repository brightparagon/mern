import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  facebook: String,
  hash: String,
  salt: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  // 이 generateJwt 함수는 회원가입 그리고 로그인 이후에 인증된 사용자 정보를 token을 만들어 여기에 담는 역할을 한다
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // 현재 시점 기준으로 일주일간 유효
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'mernblog');
};

export default mongoose.model('User', userSchema);
