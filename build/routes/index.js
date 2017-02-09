'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// const auth = jwt({
//   secret: 'mernblog',
//   userProperty: 'payload'
// });

// pages

// const jwt from 'express-jwt';
router.get('/upload', _page2.default.upload);
router.get('/signup', _page2.default.signUp);
router.get('/signin', _page2.default.signIn);
router.get('/', _page2.default.index);

// data for post
router.get('/list', _post2.default.getPosts); // posts list in index.ejs
router.post('/post', _post2.default.createPost); // create a post
router.get('/post', _post2.default.getPost); // retrieve a post
router.get('/updatePost', _post2.default.getUpdatePost); // move to update page
router.post('/postUpdate', _post2.default.updatePost); // update a post
router.get('/postDelete', _post2.default.deletePost); // delete a post

// data for user
router.post('/user', _user2.default.createUser); // create an user
router.post('/signin', _user2.default.signIn); // sign in
router.get('/signout', _user2.default.signOut); // sign out
router.get('/profile', _user2.default.profile); // get an user

module.exports = router;