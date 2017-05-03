'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var postSchema = new Schema({
  title: String,
  contents: String,
  author: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  }
});

var _default = _mongoose2.default.model('Post', postSchema);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Schema, 'Schema', 'server/models/post.js');

  __REACT_HOT_LOADER__.register(postSchema, 'postSchema', 'server/models/post.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'server/models/post.js');
}();

;