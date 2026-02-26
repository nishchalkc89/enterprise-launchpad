const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Settings = require('../models/Settings');

router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        companyName: 'THINK Acquisition LLC',
        pocName: 'William Randolph',
        phone: '(703) 819-6192',
        email: 'william@thinkacquisition.net',
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
