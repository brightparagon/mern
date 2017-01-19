var express = require('express');
var router = express.Router();
var ctrlPost = require('./post');

// router.get('/', function(req, res) {
//     res.render('index');
// });

router.get('/', ctrlPost.getPosts);
router.get('/upload', ctrlPost.upload);
router.post('/post', ctrlPost.createPost);

module.exports = router;
