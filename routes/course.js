const express = require('express')
const authControllers = require('./../controllers/authControllers')
const courseControllers = require('./../controllers/courseController')
const router = express.Router()


router.route('/')
    .get(courseControllers.getAllCourses)
    .post(authControllers.protect, courseControllers.addCourse)

router.route('/:_id')
    .get(authControllers.protect, courseControllers.getCourseByID)
    .put(authControllers.protect, authControllers.restrictTo('teacher') ,courseControllers.updateCourse)
    .delete(authControllers.protect, courseControllers.deleteCourse)

router.route('/subscribe/:_id')
    .put(authControllers.protect, courseControllers.subscribe)
    .delete(authControllers.protect, courseControllers.subDelete)
module.exports = router