const express = require('express');
const authControllers = require('./../controllers/authControllers');
const courseControllers = require('./../controllers/courseController');
const upload = require('./../utils/upload');

const router = express.Router();

router.route('/')
    .get(courseControllers.getAllCourses)
    .post(authControllers.protect, courseControllers.addCourse);

// router.route('/img')
//     .post(authControllers.protect, upload.single('file'), courseControllers.addCourseImg);



router.route('/byUser')
    .get(authControllers.protect, courseControllers.UserInCourses)

router.route('/:_id')
    .get(authControllers.protect,courseControllers.getCourseByID)
    .put(authControllers.protect ,courseControllers.updateCourse)
    .delete(authControllers.protect,  courseControllers.deleteCourse)

// router.route('/isuserInCourse/')
//     .get(authControllers.protect,authControllers.isByUser, courseControllers.isUserInCourse)


router.route('/subscribe/:_id')
    .put(authControllers.protect, courseControllers.subscribe)
    .delete(authControllers.protect, courseControllers.subDelete)
module.exports = router