'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

module.exports.getPosts = function (req, res, next) {
  _post2.default.find().populate('author').exec(function (err, posts) {
    if (err) return next(err);
    res.render('list', { posts: posts });
  });
};

module.exports.createPost = function (req, res, next) {
  var post = new _post2.default();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.session.user._id;
  post.save(function (err, post) {
    if (err) return next(err);
    res.render('post', { post: post });
  });
  req.session.user.posts.push(post);
  // 포스트를 하나 저장할 때마다 유저 스키마에 포스트를 저장하고 유저를 업데이트한다
  _user2.default.findByIdAndUpdate(req.session.user._id, req.session.user, { new: true }, function (err) {
    if (err) return next(err);
    // {new: true} 옵션은 수정된 객체를 반환할 것인가의 유무를 전달한다
  });
};

module.exports.getPost = function (req, res, next) {
  _post2.default.findById(req.query.postId).populate('author').exec(function (err, post) {
    if (err) return next(err);
    res.render('post', { post: post });
  });
};

module.exports.updatePost = function (req, res, next) {
  _post2.default.findByIdAndUpdate(req.query.postId, { $set: req.body }, { new: true }).populate('author').exec(function (err, post) {
    if (err) return next(err);
    res.render('post', { post: post });
  });
};

module.exports.getUpdatePost = function (req, res, next) {
  _post2.default.findById(req.query.postId).populate('author').exec(function (err, post) {
    if (err) return next(err);
    res.render('updatePost', { post: post });
  });
};

module.exports.deletePost = function (req, res, next) {
  _post2.default.findByIdAndRemove(req.query.postId, function (err) {
    if (err) return next(err);
    res.redirect('/list');
  });
};