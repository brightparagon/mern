var express = require('express');
var router = express.Router();
var ctrlPost = require('./post');

// router.get('/', function(req, res) {
//     res.render('index');
// });

router.get('/', ctrlPost.getPosts); // posts list in index.ejs
router.get('/upload', ctrlPost.upload); // upload a post
router.get('/post/:postId', ctrlPost.getPost); // retrieve a post
router.post('/post', ctrlPost.createPost); // create a post

module.exports = router;
