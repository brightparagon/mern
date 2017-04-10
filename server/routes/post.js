import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/post';
import User from '../models/user';
const router = express.Router();

// LIST POSTS
router.get('/all', (req, res, next) => {
  Post.find().populate('author').exec(function(err, posts) {
    if(err) return next(err);
    return res.json({
      posts: posts,
    });
  });
});

// CREATE POST
router.post('/', (req, res, next) => {
  const post = new Post();
  post.title = req.body.title;
  post.contents = req.body.contents;
  post.author = req.body.userId;
  post.save(function(err, post) {
    if(err) return next(err);
    return res.json({
      post: post,
    });
  });

  // 포스트를 하나 저장할 때마다 유저 스키마에 포스트를 저장하고 유저를 업데이트한다
  User.findByIdAndUpdate(req.body.userId, {$push: {posts: post._id}},
    {new: true}, function(err) {
    if(err) return next(err);
    // {new: true} 옵션은 수정된 객체를 반환할 것인가의 유무를 전달한다
  });
});

// RETRIEVE POST
// NOT USED YET
router.get('/:postId', (req, res, next) => {
  Post.findById(req.params.postId).populate('author').exec(function(err, post) {
    if(err) return next(err);
    return res.json({
      post: post,
    });
  });
});

// UPDATE POST
router.put('/:postId', (req, res, next) => {
  console.log(req.params.postId);
  Post.findByIdAndUpdate(req.params.postId, {$set: req.body},
    {new: true}).populate('author').exec(function(err, post) {
    if(err) return next(err);
    return res.json({
      post: post,
    });
  });
});

// DELETE POST
router.delete('/:postId', (req, res, next) => {
  // 게시물 삭제시 User 스키마에서도 ObjectId 삭제
  Post.findByIdAndRemove(req.params.postId, function(err) {
    if(err) return next(err);
    return res.json({
      success: true,
    });
  });
});

export default router;
