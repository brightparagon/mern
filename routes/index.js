var express = require('express');
var router = express.Router();
var ctrlPost = require('./post');
var ctrlUser = require('./user');
var ctrlPage = require('./page');

// pages
router.get('/upload', ctrlPage.upload);
router.get('/signup', ctrlPage.signUp);
router.get('/signin', ctrlPage.signIn);

// data for post
router.get('/', ctrlPost.getPosts); // posts list in index.ejs
router.post('/post', ctrlPost.createPost); // create a post
router.get('/post', ctrlPost.getPost); // retrieve a post

// data for user
router.post('/user', ctrlUser.createUser);
router.get('/signin', ctrlUser.signIn);

module.exports = router;
