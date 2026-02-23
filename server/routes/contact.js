const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Submission = require("../models/Submission");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    console.log("Incoming form:", req.body);

    // Save to MongoDB
    await Submission.create({ name, email, phone, message });

    // Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Mail
    await transporter.sendMail({
      from: `"THINK Acquisition Website" <${process.env.EMAIL_USER}>`,
      to: "nishchalkc370@gmail.com, sanjibsulu@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true });

  } catch (err) {
    console.error("CONTACT ERROR:", err); // 🔴 IMPORTANT
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;