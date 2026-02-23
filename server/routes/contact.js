const express = require('express');
const nodemailer = require('nodemailer');
const Submission = require('../models/Submission');
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const submission = await Submission.create({ name, email, phone, message });

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: `${process.env.NOTIFY_EMAIL_1}, ${process.env.NOTIFY_EMAIL_2}`,
      subject: `THINK Acquisition - New Contact: ${name}`,
      html,
    });

    res.status(201).json({ message: 'Submission received', id: submission._id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

module.exports = router;
