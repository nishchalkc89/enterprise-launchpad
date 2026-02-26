const express = require('express');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.findAll({ order: [['createdAt', 'DESC']] });
    res.json(submissions);
  } catch (err) {
    console.error('GET /submissions error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Submission.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Submission not found' });
    res.json({ success: true, message: 'Deleted', id: req.params.id });
  } catch (err) {
    console.error('DELETE /submissions error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
