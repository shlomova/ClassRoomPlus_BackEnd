const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

// Create a new post
const createPost = asyncHandler(async (req, res) => {
    const { userId, courseId, postData, dataType } = req.body;
  
      const post = await Post.create({
        userId,
        courseId,
        dataType,
        postData,
      });

      res.status(201).json({
        status: 'success',
        post
  });
});

// Get posts by class
const getPostsByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const posts = await Post.find({ courseId });

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

const deletePost = asyncHandler(async (req, res, next) => {
  const { _id } = req.params
  await Post.findByIdAndDelete(_id)
  res.status(201).json({
      status: 'success',
  })
})

module.exports = { createPost, getPostsByCourse, getPostsByUser, deletePost };