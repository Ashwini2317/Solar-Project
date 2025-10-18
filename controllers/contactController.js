const expressAsyncHandler = require('express-async-handler');
const ContactMessage = require('../models/ContactMessage');


const addContactMessage = expressAsyncHandler(async (req, res) => {
  const { name, email, mobile, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide name, email, and message');
  }

  const contactMessage = await ContactMessage.create({
    name,
    email,
    mobile,
    message,
    isRead: false,
    createdAt: new Date()
  });

  res.status(201).json({
    message: "Message sent successfully! We'll get back to you soon.",
    result: contactMessage
  });
})

module.exports = { addContactMessage }
