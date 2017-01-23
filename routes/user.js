var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.createUser = function(req, res, next) {
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  user.facebook = req.body.facebook;
  user.password = req.body.password;
  user.save(function(err) {
    if(err) return next(err);
    // 여기서 로그인 유무 변수를 던져줘서 네비게이션을 통제
    res.render('index');
  });
};

module.exports.signIn = function(req, res, next) {
  User.findById(req.query., function(err, post) {
    if(err) return next(err);
    res.render('post', {post: post});
  });
};
