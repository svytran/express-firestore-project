const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// GET all posts
router.get('/', async (req, res) => {
  console.log('GET /posts called');
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('posts').get();
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  try {
    const db = admin.firestore();
    const { name, message } = req.body;
    const newPost = { name, message };
    const docRef = await db.collection('posts').add(newPost);
    res.status(201).json({ id: docRef.id, ...newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a post
router.put('/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const { name, message } = req.body;
    const { id } = req.params;
    await db.collection('posts').doc(id).update({ name, message });
    res.json({ id, name, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const { id } = req.params;
    await db.collection('posts').doc(id).delete();
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;