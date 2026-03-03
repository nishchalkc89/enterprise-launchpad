const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Submission = require('../models/Submission');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log('Incoming form:', req.body);

    // Save to MySQL
    await Submission.create({ name, email, phone, message });

    // Send email if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"THINK Acquisition Website" <${process.env.EMAIL_USER}>`,
          to: 'nishchalkc370@gmail.com, sapiviteam@gmail.com',
          subject: 'New Contact Form Submission',
          html: `
            <h3>New Message Received</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Message:</b> ${message}</p>
          `,
        });

        console.log('Email sent successfully');
      } catch (mailErr) {
      console.error('Email failed but form saved:', mailErr.message, mailErr.stack);
      return res.json({ success: true, emailSent: false, emailError: mailErr.message });
      }
    }

    res.json({ success: true, emailSent: true });
  } catch (err) {
    console.error('CONTACT ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;