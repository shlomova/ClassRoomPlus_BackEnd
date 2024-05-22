const asyncHandler = require("express-async-handler");
const Course = require("../models/coursesModel");
const User = require("../models/usersModel")
const Post = require("../models/postModel")
exports.getAllCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find()
    res.status(200).json({
        status: 'success',
        courses
    })
})

exports.addCourse = asyncHandler(async (req, res, next) => {
    const courseData = req.body;

    // Create a new course directly using Course.create()
    const newCourse = await Course.create(courseData);

    // Send response
    res.status(201).json({
        status: 'success',
        course: newCourse
    });
});

exports.getCourseByID = asyncHandler(async (req, res, next) => {
    const {_id} = req.params
    const courses = await Course.findOne(_id)
    res.status(200).json({
        status: 'success',
        courses
    })
})

exports.updateCourse = asyncHandler(async (req, res, next) => {
    const {_id} = req.params
    const updatedDetails = req.body
    const updatedCourse = await Course.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(201).json({
        status: 'success',
        updatedCourse
    })
})

exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const {_id} = req.params
    let role = req.user.role
    const course = await Course.findById(_id)
    const subscription = course.subscription.find(sub => sub.userId.toString() === req.user._id.toString());
    if (role !== 'admin' && subscription.role !== 'teacher') {
        res.status(403).json({
            status: 'fail',
            message: 'You are not authorized to delete this course'
        })
    }
    await Course.findByIdAndDelete(_id)

    await Post.find({courseId: _id}).deleteMany()
    await User.find({courses: _id}).updateMany({$pull: {courses: _id}})
    res.status(204).json({
        status: 'success',
        data: null
    })
})

const updateCourseAndUser = async (courseId, userId, courseUpdate, userUpdate) => {
    const course = await Course.findByIdAndUpdate(courseId, courseUpdate, { new: true });
    const user = await User.findByIdAndUpdate(userId, userUpdate, { new: true });
    return { course, user };
};

exports.subscribe = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    let userId = req.user._id;
    if (req.user.role === 'teacher') {
        userId = req.body.userId;
    }

    const course = await Course.findById(_id);
    const subscriptionIndex = course.subscription.findIndex(sub => sub.userId === userId);
    const courseUpdate = subscriptionIndex === -1
        ? { $addToSet: { subscription: { userId: userId, role: undefined } } }
        : { $set: { [`subscription.${subscriptionIndex}.role`]: 'student' } };

    const userUpdate = { $push: { courses: _id } };

    const { course: updatedCourse, user } = await updateCourseAndUser(_id, userId, courseUpdate, userUpdate);

    res.status(201).json({
        status: 'success',
        course: updatedCourse,
        user
    });
});

exports.subDelete = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    let userId = req.user._id;
    if (req.user.role === 'teacher') {
        userId = req.body.userId;
    }

    const courseUpdate = { $pull: { subscription: { userId } } };
    const userUpdate = { $pull: { courses: _id } };

    const { course, user } = await updateCourseAndUser(_id, userId, courseUpdate, userUpdate);

    res.status(201).json({
        status: 'success',
        course,
        user
    });
});
