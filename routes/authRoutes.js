const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,

} = require('../controllers/authController');
const { adminProtected } = require('../middleware/authMiddleware');


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);


router.post('/logout', adminProtected, logoutAdmin);



module.exports = router;
