const express = require('express')
const { createFile, getFilesByCourse, getFile, deleteFile } = require('../controllers/fileControllers.js')
const upload = require('../utils/upload')
const multer = require('multer')
const path = require('path')
const authControllers = require('./../controllers/authControllers');

const router = express.Router()


router.route('/')
    .post(authControllers.protect, upload.single('file'), createFile)

router.route('/course/:courseId')
    .get( authControllers.protect, getFilesByCourse)

router.route('/:fileId')
    .get(authControllers.protect, getFile)
    .delete(authControllers.protect, deleteFile)

module.exports = router
