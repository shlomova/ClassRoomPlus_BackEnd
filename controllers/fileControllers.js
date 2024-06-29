const File = require('../models/filemodels.js');
const Course = require('../models/coursesModel.js'); 
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/AppError'); 
const fs = require('fs');

// יצירת קובץ והוספתו לקורס
exports.createFileInCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const file = await File.create({
    courseId,
    file: req.file.filename
  });

  // עדכון הקורס עם מזהה הקובץ החדש
  await Course.findByIdAndUpdate(courseId, {
    $push: { contents: file._id }
  });

  res.json({
    status: 'success',
    file
  });
});


exports.getFilesByCourse = (async (req, res, next) => {
    const { courseId } = req.params
    const files = await File.find({ courseId : courseId})
    console.log(222,courseId)
    console.log(111,files)
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



exports.deleteFile = asyncHandler(async (req, res, next) => {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
  
    if (!file) {
      return next(new AppError(404, 'File not existent'));
    }
  
    fs.unlink(`Files/${file.file}`, async (err) => {
      if (err) {
        return next(new AppError(500, 'File not deleted'));
      }
  
      await Course.findByIdAndUpdate(file.courseId, {
        $pull: { contents: file._id }
      });
  
      await file.deleteOne();
  
      res.json({
        status: 'success',
        message: 'File deleted'
      });
    });
  });
  