const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const fs = require('fs');

// Create a new post
const createPost = asyncHandler(async (req, res) => {
  let {courseId, postData, dataType } = req.body;
  const userId = req.user._id;
  if (dataType === 'file'){
    postData = req.file.path;
  }

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

// get all posts by a user
const getPostsByUser = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const { userId } = req.params;
  const posts = await Post.find({ userId });
  res.json({
    status: 'success',
    posts
  });
}
);
// get all posts by a course
const getPostsByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const posts = await Post.find({ courseId });

  res.json({
    status: 'success',
    posts
  });
}
);


// Delete a post
const deletePost = asyncHandler(

  async (req, res,next) => {
    const { postId } = req.params;

    
    const post = await Post.findById(postId);
    if (!post) {
      return next(new AppError(404, 'Post not found'));
    }
    const {userId} = post;;
  
  if (req.user.role === 'user' && userId.toString() !== req.user._id.toString()) {
    return next(new AppError(403, 'You are not authorized to perform this action'));
  }
  
    if (post.dataType === 'file') {
      fs.unlink(post.postData, (err) => {
        if (err) {
          return next(new AppError(500, err.message));
        }
      });
    }
    await post.deleteOne();
    console.log('post')

    res.json({
      status: 'success',
      message: 'Post deleted'
    });
  }
);


module.exports = { createPost, getPostsByCourse, getPostsByUser, deletePost };