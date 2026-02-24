const express = require('express');
const Content = require('../models/Content');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET by sectionId
router.get('/:sectionId', async (req, res) => {
  try {
    let content = await Content.findOne({ sectionId: req.params.sectionId });
    if (!content) {
      // Auto-create if missing
      content = await Content.create({ sectionId: req.params.sectionId, title: req.params.sectionId, metadata: {} });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) {
      // Try by sectionId
      const bySection = await Content.findOneAndUpdate({ sectionId: req.params.id }, req.body, { new: true, upsert: true });
      return res.json(bySection);
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
