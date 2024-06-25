const File = require('../models/filemodels.js')
const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError') 
const fs = require('fs')
// it needs to also have the couseid so that we can get the files by course
exports.createFileInCourse = asyncHandler(async (req, res, next) => {
    const {courseId} = req.params
   
    const file = await File.create({
        courseId,
        file: req.file.path
    })
    res.json({
        status: 'success',
        file
    });
})

exports.getFilesByCourse = (async (req, res, next) => {
    const { courseId } = req.params
    const files = await File.find({ course: courseId })
    res.json({
        status: 'success',
        files
    });
    
}
);


   

exports.getFile = (async (req, res, next) => {
    const { fileId } = req.params
    const file = await File.findById(fileId)
    res.json({
        status: 'success',
        file
    });
}
);



exports.deleteFile = (async (req, res, next) => {
    const { fileId } = req.params
    const file = await File.findById(fileId)
    if (!file) {
        return next(new AppError(404, 'File not existent'));
    }
    fs.unlink(file.file, (err) => {
        if (err) {
            return next(new AppError(500, 'File not deleted'));
        }
    })
    await file.deleteOne()

  
    res.json({
        status: 'success',
        message: 'File deleted'
    });
}
);

