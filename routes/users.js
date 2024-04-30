const express = require('express')
const authControllers = require('./../controllers/authControllers')
const usersControllers = require('./../controllers/usersControllers')
const router = express.Router()


router.route('/').get(usersControllers.getAllUsers)

router.route('/login').post(authControllers.login)
router.route('/signup').post(authControllers.register)

module.exports = router