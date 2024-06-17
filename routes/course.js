const express = require('express')
const authControllers = require('./../controllers/authControllers')
const courseControllers = require('./../controllers/courseController')
const router = express.Router()


router.route('/')
    .get(courseControllers.getAllCourses)
    .post(authControllers.protect,authControllers.isByUser, courseControllers.addCourse)

router.route('/:_id')
    .get(authControllers.protect,courseControllers.getCourseByID)
    .put(authControllers.protect,authControllers.isByUser, authControllers.restrictTo('teacher') ,courseControllers.updateCourse)
    .delete(authControllers.protect,authControllers.restrictTo('teacher'),  courseControllers.deleteCourse)

// router.route('/isuserInCourse/')
//     .get(authControllers.protect,authControllers.isByUser, courseControllers.isUserInCourse)


router.route('/subscribe/:_id')
    .put(authControllers.protect,authControllers.isByUser, courseControllers.subscribe)
    .delete(authControllers.protect,authControllers.isByUser, courseControllers.subDelete)
module.exports = router