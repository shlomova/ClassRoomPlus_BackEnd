const express = require('express');
const router = express.Router();
const authControllers = require('./../controllers/authControllers');
const { createPost, getPostsByCourse, deletePost } = require('../controllers/postController');
const upload = require('./../utils/upload');


router.post('/', authControllers.protect, 
  upload.array('files'),
  createPost);


router.get('/course/:courseId', authControllers.protect,authControllers.isByUser, getPostsByCourse);


router.delete('/:postId', authControllers.protect,authControllers.isByUser, deletePost);


module.exports = router;