const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: String, default: 'Anonymous' },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  replies: [replySchema]
});

module.exports = mongoose.model('Comment', commentSchema);
