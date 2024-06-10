// a route for sending mail to teacher
const express = require('express')
const router = express.Router()
const authControllers = require('./../controllers/authControllers')
const approveStudent =  require('./../utils/sendmailtoteacher')
const verfieduser = require('./../utils/sendmailtoteacher')




router.route('/verfieduser/:_Id').put(verfieduser.verfieduser)
router.route('/approvestudent').put(authControllers.protect, approveStudent.approveStudent)


module.exports = router
