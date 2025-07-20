const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET all comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching comments.' });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  const { postId, name, message } = req.body;
  try {
    const newComment = new Comment({ postId, name, message });
    await newComment.save();
    res.json(newComment);
  } catch (err) {
    res.status(400).json({ error: 'Error saving comment.' });
  }
});

module.exports = router;
