const express = require('express');
const { addContactMessage } = require('../controllers/contactController');
const router = express.Router();


router.post('/submit', addContactMessage);


module.exports = router;
