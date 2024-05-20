const express = require('express')
const { createFile } = require('../controllers/fileControllers.js')
const upload = require('../utils/upload')
const multer = require('multer')
const path = require('path')
const router = express.Router()


router.route('/')
    .post(upload.single('file'), createFile)

module.exports = router
