const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    res.json({ token, admin: { email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
