const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
