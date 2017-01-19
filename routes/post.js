var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports.upload = function(req, res, next) {
  res.render('post');
};

module.exports.getPosts = function(req, res, next) {
  Post.find().exec(function(error, posts) {
    if(error) return next(error);
    // res.json({posts : posts});
    res.render('index', {posts: posts});
  });
};

module.exports.createPost = function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(error, post) {
    if(error) return next(error);
    res.status(200).json({post : post});
  });
};
