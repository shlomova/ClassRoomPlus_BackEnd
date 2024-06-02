const asyncHandler = require("express-async-handler");
const Course = require("../models/coursesModel");
const User = require("../models/usersModel")
const Post = require("../models/postModel")
const SendMailToTeacher = require("./mailControllers.js")
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


    res.status(201).json({
        status: 'success',
        course: newCourse
    });
});

exports.getCourseByID = asyncHandler(async (req, res, next) => {
    const { _id } = req.params
    console.log(req.user)
    const course = await Course.findById(_id)
    .populate('subscription.userId','firstName lastName')
    console.log(course)
    res.status(200).json({
        status: 'success',
        course
    })
})






exports.updateCourse = asyncHandler(async (req, res, next) => {
    const { _id } = req.params
    const updatedDetails = req.body
    const updatedCourse = await Course.findByIdAndUpdate(_id, updatedDetails, { new: true })
    res.status(201).json({
        status: 'success',
        updatedCourse
    })
})

exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const {_id} = req.params
    // let role = req.user.role
    const course = await Course.findById(_id)
    const subscription = course.subscription.find(sub => sub.userId === req.user._id.toString());
    if (course.subscription.role !== 'teacher') {
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
    const { _id: courseId } = req.params;
    let userId = req.user._id;

    const isExist = req.user.courses.findIndex(courseId => courseId.toString() == courseId)

    if (isExist !== -1) {
        res.status(403).json({
            status: 'fail',
            message: 'You are already subscribed to this course'
        });
        return
    }
    if (req.user.role === 'teacher') {
        _Id = req.body.userId;
    }
    const course = await Course.findById(courseId);
    // console.log({
    //     // subscriptionIndex,
    //     course   });
    const subscriptionIndex = course.subscription.findIndex(sub => sub.userId === userId);
    if (subscriptionIndex === -1) {

    }
    const courseUpdate = { $addToSet: { subscription: { userId: userId.toString(), role: null } } }

    const userUpdate = { $push: { courses: courseId } };

    const { course: updatedCourse, user } = await updateCourseAndUser(courseId, userId, courseUpdate, userUpdate);
    
    SendMailToTeacher.SendMailToTeacher(req, res)

    res.status(201).json({
        status: 'success',
        course: updatedCourse,

    });
});

exports.subDelete = asyncHandler(async (req, res, next) => {
    const { _id} = req.params;
    let userId = req.user._id;
    if (req.user.role === 'teacher') {
        userId = req.body.userId;
    }
    // to remove the course from the user's courses array
    // to remove the user from the course's subscription array
    const courseUpdate = { $pull: { subscription: { userId: userId.toString() } } };
    const userUpdate = { $pull: { courses: _id } };
  
   
    
    await updateCourseAndUser(_id, userId, courseUpdate, userUpdate);
    


    res.status(201).json({
        status: 'success',
        message: 'Unsubscribed successfully'
       
    });
});
