const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// GET one post by ID
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// CREATE a new post
router.post('/', async (req, res) => {
  const { title, body, category, image } = req.body;
  const newPost = new Post({ title, body, category, image });
  await newPost.save();
  res.json(newPost);
});

// UPDATE a post
router.put('/:id', async (req, res) => {
  const { title, body, category, image } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, { title, body, category, image }, { new: true });
  res.json(post);
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
