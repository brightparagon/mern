import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Post', postSchema);
