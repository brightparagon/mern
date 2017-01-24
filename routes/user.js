var mongoose = require('mongoose');
var passport = require('passport');
// var jwt = require('jsonwebtoken');
var User = mongoose.model('User');

module.exports.createUser = function(req, res, next) {
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  user.facebook = req.body.facebook;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if(err) return next(err);
    // 여기서 로그인 유무 변수를 던져줘서 네비게이션을 통제
    var token;
    token = user.generateJwt();
    var decoded = jwt.verify(req.headers.authorization, 'mernblog');
    res.render('profile', {token: decoded});
  });
};

module.exports.signIn = function(req, res, next) {
  passport.authenticate('local', function(err, user, info){
    var token;
    if(err) {
      res.status(404).json(err);
      return;
    }
    if(user){
      token = user.generateJwt();
      res.render('profile', {token: token});
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
