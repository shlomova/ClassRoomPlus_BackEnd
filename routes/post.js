const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const { createPost, getPostsByCourse, deletePost } = require('../controllers/postController');
const upload = require('../utils/upload');

router.post('/', 
  (req, res, next) => {
    console.log('Received request to create post');
    next();
  },
  authControllers.protect, 
  (req, res, next) => {
    console.log('User authenticated');
    next();
  },
  upload.array('file'), 
  (req, res, next) => {
    console.log('Files processed by multer:', req.files);
    console.log('Request body after file upload:', req.body);
    next();
  },
  createPost
);

router.get('/course/:courseId', authControllers.protect, getPostsByCourse);

router.delete('/:postId', authControllers.protect, deletePost);

module.exports = router;