const express = require('express');
const Analytics = require('../models/Analytics');
const router = express.Router();

// Get analytics (public)
router.get('/', async (req, res) => {
  let record = await Analytics.findOne({ where: { id: 1 } });
  if (!record) record = await Analytics.create({ id: 1, pageViews: 0 });
  res.json({ pageViews: record.pageViews });
});

// Increment page view (public)
router.post('/view', async (req, res) => {
  let record = await Analytics.findOne({ where: { id: 1 } });
  if (!record) record = await Analytics.create({ id: 1, pageViews: 1 });
  else {
    record.pageViews += 1;
    await record.save();
  }
  res.json({ pageViews: record.pageViews });
});

module.exports = router;
