// a route for sending mail to teacher
const express = require('express')
const router = express.Router()
const authControllers = require('./../controllers/authControllers')
const approveStudent =  require('./../utils/sendmailtoteacher')



router.route('/approvestudent').put( approveStudent.approveStudent)


module.exports = router
