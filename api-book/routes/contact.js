const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.BOOKVAULT_EMAIL,
        pass: process.env.BOOKVAULT_PASS
      }
    });

    await transporter.sendMail({
        from: `"BookVault Contact" <${email}>`,
        to: process.env.BOOKVAULT_EMAIL,
        subject: `📬 New Message from ${name} (BookVault)`,
        html: `
        <p>Hi Shubham,</p>
      
        <p><strong>You've received a new message from BookVault's contact form:</strong></p>
      
        <p><strong>Sender Name:</strong> ${name}</p>
        <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
      
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      
        <br>
      
        <p>Best regards,</p>
        <p><strong>BookVault Team</strong></p>
      `
      
      });
      

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
