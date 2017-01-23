var express = require('express');
var router = express.Router();
var ctrlPost = require('./post');
var ctrlPage = require('./page');

// pages
router.get('/upload', ctrlPage.upload);
router.get('/signup', ctrlPage.signUp);
router.get('/signin', ctrlPage.signIn);

// data
router.get('/', ctrlPost.getPosts); // posts list in index.ejs
router.get('/post', ctrlPost.getPost); // retrieve a post
router.post('/post', ctrlPost.createPost); // create a post

module.exports = router;
