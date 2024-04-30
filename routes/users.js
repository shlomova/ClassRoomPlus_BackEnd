const express = require('express')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const router = express.Router()


router.route('/').get(userControllers.getAllUsers)

router.route('/login').post(authControllers.login)
router.route('/signup').post(authControllers.register)

module.exports = router