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
  // 포스트를 하나 저장할 때마다 유저 스키마에 포스트를 저장하고 유저를 업데이트한다
  User.findByIdAndUpdate(req.session.user._id, req.session.user, {new: true}, function(err) {
    if(err) return next(err);
    // {new: true} 옵션은 수정된 객체를 반환할 것인가의 유무를 전달한다
  });
};

module.exports.getPost = function(req, res, next) {
  Post.findById(req.query.postId).populate('author').exec(function(err, post) {
    if(err) return next(err);
    res.render('post', {post: post});
  });
};

module.exports.updatePost = function(req, res, next) {
  Post.findByIdAndUpdate(req.query.postId, {$set: req.body}, {new: true}).populate('author').exec(function(err, post) {
    if(err) return next(err);
    res.render('post', {post: post});
  });
};

module.exports.getUpdatePost = function(req, res, next) {
  Post.findById(req.query.postId).populate('author').exec(function(err, post) {
    if(err) return next(err);
    res.render('updatePost', {post: post});
  });
};

module.exports.deletePost = function(req, res, next) {
  Post.findByIdAndRemove(req.query.postId, function(err) {
    if(err) return next(err);
    res.redirect('/list');
  });
};
