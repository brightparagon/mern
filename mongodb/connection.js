var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/mernblog';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { safe: true });

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});

require('./models/post');
require('./models/user');

// mongoose.connect('mongodb://ygy:9708@ds117209.mlab.com:17209/ygy_study');
//
// const schema = new mongoose.Schema({
//     number: Number,
//     heading: String,
//     content: String
// });
//
// var Post = mongoose.model('post', schema);
