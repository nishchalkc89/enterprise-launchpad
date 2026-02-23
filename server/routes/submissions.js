const express = require('express');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const submissions = await Submission.find().sort('-createdAt');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
