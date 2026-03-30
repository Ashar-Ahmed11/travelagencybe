const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyAdmin = require('../middleware/verifyAdmin');

// GET /api/posts - list all posts (newest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/posts/:id - get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/posts - create (admin)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Missing fields' });
    const created = await Post.create({ title, description });
    res.status(201).json(created);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/posts/:id - update (admin)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    const updated = await Post.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/posts/:id - delete (admin)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

