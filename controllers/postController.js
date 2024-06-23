const Post = require('../models/postModel');
const Course = require('../models/coursesModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const fs = require('fs');

// Create a new post
const createPost = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    let {courseId,userId, postData} = req.body;
    let course = await Course.findById(courseId);
    if (!course) {
        return next(new AppError(404, 'Course not found'));
    }
    const subscription = course.subscription.find(sub => sub.userId.toString() === userId.toString());
    if (!subscription) {
        return next(new AppError(403, 'You are not in this course'));
    }
    if (subscription.role === 'teacher')
        userId = null;
    let postFiles = null;
    if (req.files)
        postFiles = req.files.map(file => file.path);
    const post = await Post.create({
        userId,
        courseId,
        postFiles,
        postData,
    });

    if (userId === null)
        await Course.findByIdAndUpdate(courseId, {$push: {contents: post._id}}, {new: true})

    res.status(201).json({
        status: 'success',
        post
    });
});

// get all posts by a user
const getPostsByUser = asyncHandler(async (req, res) => {
        // console.log(req.params);
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.json({
            status: 'success',
            posts
        });
    }
);
// get all posts by a course
const getPostsByCourse = asyncHandler(async (req, res) => {
        const {courseId} = req.params;

        const posts = await Post.find({courseId});

        res.json({
            status: 'success',
            posts
        });
    }
);


// Delete a post
const deletePost = asyncHandler(async (req, res, next) => {
    const {postId} = req.params;

    const post = await Post.findById(postId);
    if (!post) {
        return next(new AppError(404, 'Post not found'));
    }

    const course = await Course.findById(post.courseId);
    if (!course) {
        return next(new AppError(404, 'Course not found'));
    }
    const subscription = course.subscription.find(sub => sub.userId.toString() === req.user._id.toString());
    const role = subscription ? subscription.role : null;

    if (role !== 'teacher' && (role === null || (role === 'student' && post.userId.toString() !== req.user._id.toString()))) {
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

    res.json({
        status: 'success',
        message: 'Post deleted'
    });
});

module.exports = {createPost, getPostsByCourse, getPostsByUser, deletePost};