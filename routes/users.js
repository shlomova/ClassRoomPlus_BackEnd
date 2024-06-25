const express = require('express')
const authControllers = require('./../controllers/authControllers')
const usersControllers = require('./../controllers/usersControllers')
const router = express.Router()


router.route('/').get(authControllers.protect, usersControllers.getAllUsers)

router.route('/login').post(authControllers.login)
router.route('/signup').post(authControllers.register)
router.route('/:_id').put(authControllers.protect, usersControllers.updateUser)

module.exports = router