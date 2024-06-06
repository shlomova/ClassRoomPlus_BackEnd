const express = require('express')
const { createFileInCourse, getFilesByCourse, getFile, deleteFile } = require('../controllers/fileControllers.js')
const upload = require('../utils/upload')
const multer = require('multer')
const path = require('path')
const authControllers = require('./../controllers/authControllers');

const router = express.Router()


// router.route('/')

router.route('/course/:courseId')
    .post(authControllers.protect,authControllers.isByUser, upload.single('file'), createFileInCourse)
    .get( authControllers.protect,authControllers.restrictTo('admin'), getFilesByCourse)

router.route('/:fileId')
    .get(authControllers.protect,authControllers.isByUser, getFile)
    .delete(authControllers.protect,authControllers.isByUser, deleteFile)

module.exports = router
