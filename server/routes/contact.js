const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Submission = require('../models/Submission');

const getEmailConfig = () => {
  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '').trim();

  return {
    user,
    pass,
    host: (process.env.EMAIL_HOST || 'smtp.gmail.com').trim(),
    port: Number(process.env.EMAIL_PORT || 465),
    secure: String(process.env.EMAIL_SECURE || 'true').toLowerCase() === 'true',
    from: (process.env.EMAIL_FROM || user).trim(),
    recipients: (process.env.CONTACT_RECIPIENTS || 'nishchalkc370@gmail.com, sapiviteam@gmail.com').trim(),
  };
};

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log('Incoming form:', req.body);

    // Save to MySQL
    await Submission.create({ name, email, phone, message });

    const emailConfig = getEmailConfig();

    // Send email if credentials exist
    if (emailConfig.user && emailConfig.pass) {
      try {
        const transporter = nodemailer.createTransport({
          host: emailConfig.host,
          port: emailConfig.port,
          secure: emailConfig.secure,
          auth: {
            user: emailConfig.user,
            pass: emailConfig.pass,
          },
        });

        await transporter.verify();

        await transporter.sendMail({
          from: `"THINK Acquisition Website" <${emailConfig.from}>`,
          to: emailConfig.recipients,
          replyTo: email || undefined,
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
        return res.json({ success: true, emailSent: true, email_status: 'Sent' });
      } catch (mailErr) {
        console.error('Email failed but form saved:', {
          message: mailErr.message,
          code: mailErr.code,
          command: mailErr.command,
          response: mailErr.response,
          responseCode: mailErr.responseCode,
        });

        return res.json({
          success: true,
          emailSent: false,
          email_status: 'Failed',
          emailError: mailErr.message,
          email_error: mailErr.message,
        });
      }
    }

    return res.json({
      success: true,
      emailSent: false,
      email_status: 'Failed',
      emailError: 'EMAIL_USER/EMAIL_PASS missing on server',
      email_error: 'EMAIL_USER/EMAIL_PASS missing on server',
    });
  } catch (err) {
    console.error('CONTACT ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;