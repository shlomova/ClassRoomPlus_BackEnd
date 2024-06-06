const express = require('express')
const authControllers = require('./../controllers/authControllers')
const courseControllers = require('./../controllers/courseController')
const router = express.Router()


router.route('/')
    .get(authControllers.protect,courseControllers.getAllCourses)
    .post(authControllers.protect,authControllers.isByUser, courseControllers.addCourse)

router.route('/:_id')
    .get(authControllers.protect,courseControllers.getCourseByID)
    .put(authControllers.protect,authControllers.isByUser, authControllers.restrictTo('teacher') ,courseControllers.updateCourse)
    .delete(authControllers.protect,authControllers.restrictTo('teacher'),  courseControllers.deleteCourse)

router.route('/public/:_id').get(courseControllers.getCourseByID);


router.route('/subscribe/:_id')
    .put(authControllers.protect,authControllers.isByUser, courseControllers.subscribe)
    .delete(authControllers.protect,authControllers.isByUser, courseControllers.subDelete)
module.exports = router