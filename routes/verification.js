const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// נתיב לשליחת מייל עם קוד אימות
router.post('/send-verification', verificationController.sendVerification);

// נתיב לאימות הקוד שהוזן
router.post('/verify-code', verificationController.verifyCode);

module.exports = router;
