const express = require('express');
const router = express.Router();
const authControllers = require('./../controllers/authControllers');
const { createPost, getPostsByCourse, getPostsByUser, deletePost } = require('../controllers/postController');
const upload = require('./../utils/upload');

// Route for creating a new post
router.post('/', authControllers.protect, 
  upload.array('files'),
  createPost);

// Route for fetching posts by course
router.get('/course/:courseId', authControllers.protect, getPostsByCourse);
// Route for fetching posts by user
// router.get('/user/:userId', authControllers.protect, getPostsByUser);
router.delete('/:postId', authControllers.protect, deletePost);


module.exports = router;