const express = require('express');
const {
    getContactMessage,
    getSingleMessage,
    updateContactMessage,
    deleteContactMessage,
    getUnreadCount,
    markAllAsRead
} = require('../controllers/adminController');
const { adminProtected } = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/messages', adminProtected, getContactMessage);

router.get('/messages/:id', adminProtected, getSingleMessage);

router.put('/messages/:id', adminProtected, updateContactMessage);

router.delete('/messages/:id', adminProtected, deleteContactMessage);

router.get('/unread-count', adminProtected, getUnreadCount);

router.put('/mark-all-read', adminProtected, markAllAsRead);

module.exports = router;
