const asyncHandler = require("express-async-handler");
const Course = require("../models/coursesModel");

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
    await Course.findByIdAndDelete(_id)
    res.status(201).json({
        status: 'success',
    })
})

exports.subscribe = asyncHandler(async (req, res, next) => {
    const {_id} = req.params
    const {userId} = req.body
    let course = await Course.findById(_id)
    const subscriptionIndex = course.subscription.findIndex(sub => sub.userId === userId);
    let update = {};
    if (subscriptionIndex !== -1) {
        update = {
             $set: { [`subscription.${subscriptionIndex}.role`]: 'student' }
        };
    } else {
        update = {
            $addToSet: {
                subscription: {userId: userId, role: undefined}
            }
        };
    }
    course = await Course.findByIdAndUpdate(
        _id,
        update,
        {new: true}
    );
    res.status(201).json({
        status: 'success',
        course
    })
})