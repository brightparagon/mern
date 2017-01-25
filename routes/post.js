var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

module.exports.getPosts = function(req, res, next) {
  Post.find().populate('author').exec(function(err, posts) {
    if(err) return next(err);
    res.render('list', {posts: posts});
  })
};

module.exports.createPost = function(req, res, next) {
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.session.user._id;
  post.save(function(err, post) {
    if(err) return next(err);
    res.render('post', {post: post});
  });
  req.session.user.posts.push(post);
  User.findByIdAndUpdate(req.session.user._id, req.session.user, {new: true}, function(err) {
    if(err) return next(err);
  });
};

module.exports.getPost = function(req, res, next) {
  Post.findById(req.query.postId).populate('author').exec(function(err, post) {
    if(err) return next(err);
    res.render('post', {post: post});
  })
};
