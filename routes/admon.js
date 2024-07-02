const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const adminController = require('../controllers/adminController.js');
const authControllers = require('../controllers/authControllers');


router.route('/update').post(authControllers.protect,authControllers.restrictTo('admin'), asyncHandler(adminController.updateContent));




   

module.exports = router;
