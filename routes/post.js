const express = require('express');
const router = express.Router();
const authControllers = require('./../controllers/authControllers');
const { createPost, getPostsByCourse, getPostsByUser, deletePost } = require('../controllers/postController');

// Route for creating a new post
router.post('/', authControllers.protect, (req, res, next) => {
  const { classId } = req.body;
  const user = req.user;

  // Check if the user is registered in the class
  if (user.classes.includes(classId)) {
    // User is registered in the class, proceed with post creation
    createPost(req, res, next);
  } else {
    res.status(403).json({ message: 'Not authorized to create posts in this class' });
  }
});

// Route for fetching posts by course
router.get('/:courseId', authControllers.protect, getPostsByCourse);

// Route for fetching posts by user
router.get('/:userId', authControllers.protect, getPostsByUser);
router.delete('/:postId', authControllers.isByUser, deletePost);


module.exports = router;