const express = require('express');
const multer = require('multer');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Course = require('../models/coursesModel');
const AppError = require('./../utils/AppError');
const upload = multer({ dest: 'uploads/' });


const createPost = asyncHandler(async (req, res, next) => {
    try {
        console.log('Creating post. Request body:', req.body);
        console.log('Uploaded file:', req.file);

        const { courseId, postData = '' } = req.body;
        const userId = req.user._id;

        let course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError(404, 'Course not found'));
        }

        const subscription = course.subscription.find(sub => sub.userId.toString() === userId.toString());
        if (!subscription) {
            return next(new AppError(403, 'You are not in this course'));
        }

        let postFiles = [];
        if (req.file) {
            postFiles.push(req.file.path);
        }

        const post = await Post.create({
            userId,
            courseId,
            postFiles,
            postData,  // This can now be an empty string
        });

        if (subscription.role === 'teacher') {
            await Course.findByIdAndUpdate(courseId, { $push: { contents: post._id } }, { new: true });
        }

        res.status(201).json({
            status: 'success',
            post
        });
    } catch (error) {
        console.error('Error in createPost:', error);
        return next(new AppError(500, 'Error creating post: ' + error.message));
    }
});


module.exports = router;

const getPostsByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.json({
        status: 'success',
        posts
    });
});

const getPostsByCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const posts = await Post.find({ courseId });
    res.json({
        status: 'success',
        posts
    });
});

const deletePost = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;

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

    // if (role !== 'teacher' && (role === null || (role === 'student' && post.userId.toString() !== req.user._id.toString()))) {
    //     return next(new AppError(403, 'You are not authorized to perform this action'));
    // }

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

module.exports = { createPost, getPostsByCourse, getPostsByUser, deletePost };
