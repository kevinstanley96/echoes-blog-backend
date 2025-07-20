const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ _id: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch comments' });
  }
});

// Like a comment
router.post('/:id/like', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Could not like comment' });
  }
});

// Reply to a comment
router.post('/:id/reply', async (req, res) => {
  try {
    const reply = { text: req.body.text };
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: reply } },
      { new: true }
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Could not reply' });
  }
});

module.exports = router;
