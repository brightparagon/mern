module.exports.upload = function(req, res) {
  res.render('upload');
};

module.exports.signUp = function(req, res) {
  res.render('signup');
};

module.exports.signIn = function(req, res) {
  res.render('signin');
};

module.exports.index = function(req, res) {
  res.render('index');
};

module.exports.profile = function(req, res) {
  res.render('profile');
};
