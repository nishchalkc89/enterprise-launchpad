const express = require('express');
const Content = require('../models/Content');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const content = await Content.findAll();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:sectionId', async (req, res) => {
  try {
    let content = await Content.findOne({ where: { sectionId: req.params.sectionId } });
    if (!content) {
      content = await Content.create({ sectionId: req.params.sectionId, title: req.params.sectionId, metadata: {} });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    // Try by primary key first
    let content = await Content.findByPk(req.params.id);
    if (!content) {
      // Try by sectionId
      content = await Content.findOne({ where: { sectionId: req.params.id } });
    }
    if (!content) {
      content = await Content.create({ sectionId: req.params.id, ...req.body });
      return res.json(content);
    }
    await content.update(req.body);
    res.json(content);
  } catch (err) {
    console.error('Content update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
