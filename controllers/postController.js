const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

// Create a new post
const createPost = asyncHandler(async (req, res) => {
    const { courseID, postData, dataType } = req.body;
    const userId = req.user._id;
  
      const post = await Post.create({
        userId,
        courseID,
        dataType,
        postData,
      });

      res.status(201).json({
        status: 'success',
        post
});
    });

// Get posts by class
const getPostsByClass = asyncHandler(async (req, res) => {
  const { courseID } = req.params;

  const posts = await Post.find({ courseID });

  res.json({
    status: 'success',
    posts});
});

// Get posts by user
const getPostsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const posts = await Post.find({ userId });

  res.json({
    status: 'success',
    posts});
});

module.exports = { createPost, getPostsByClass, getPostsByUser };