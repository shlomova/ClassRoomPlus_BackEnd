const express = require('express')
const authControllers = require('./../controllers/authControllers')
const courseControllers = require('./../controllers/courseController')
const router = express.Router()


router.route('/')
    .get(courseControllers.getAllCourses)
    .post(courseControllers.addCourse)

router.route('/:_id')
    .get(courseControllers.getCourseByID)
    .put(courseControllers.updateCourse)
    .delete(courseControllers.deleteCourse)


module.exports = router