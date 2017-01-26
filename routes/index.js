var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var ctrlPost = require('./post');
var ctrlUser = require('./user');
var ctrlPage = require('./page');

var auth = jwt({
  secret: 'mernblog',
  userProperty: 'payload'
});

// pages
router.get('/upload', ctrlPage.upload);
router.get('/signup', ctrlPage.signUp);
router.get('/signin', ctrlPage.signIn);
router.get('/', ctrlPage.index);

// data for post
router.get('/list', ctrlPost.getPosts); // posts list in index.ejs
router.post('/post', ctrlPost.createPost); // create a post
router.get('/post', ctrlPost.getPost); // retrieve a post
router.get('/updatePost', ctrlPost.getUpdatePost); // move to update page
router.post('/postUpdate', ctrlPost.updatePost); // update a post
router.get('/postDelete', ctrlPost.deletePost); // delete a post

// data for user
router.post('/user', ctrlUser.createUser); // create an user
router.post('/signin', ctrlUser.signIn); // sign in
router.get('/signout', ctrlUser.signOut); // sign out
router.get('/profile', ctrlUser.profile); // get an user

module.exports = router;
