const asyncHandler = require("express-async-handler");
const Course = require("../models/coursesModel");
const User = require("../models/usersModel")
const Post = require("../models/postModel")
const File = require("../models/filemodels.js")
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
    const { _id } = req.params;
  
    const course = await Course.findById(_id)
        .populate('subscription.userId', 'firstName lastName avatar')
        .populate('contents', 'file');
  
    console.log(course);
  
    res.status(200).json({
        status: 'success',
        course
    });
});
// need to find the courses that the user is subscribed to user.courses[] = course._id and then find the course using the course._id
// then populate the course with the user's details
// then return the courses

exports.UserInCourses = asyncHandler(async (req, res, next) => {
    const userscourses = await Course.find({ _id: { $in: req.user.courses } })
    res.status(200).json({
        status: 'success',
        userscourses
    });
});










exports.updateCourse = asyncHandler(async (req, res, next) => {
    console.log(req.body, req.params)
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
    // if (course.subscription.role !== 'teacher') {
    //     res.status(403).json({
    //         status: 'fail',
    //         message: 'You are not authorized to delete this course'
    //     })
    // }
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
    const { _id: courseid } = req.params;
    console.log(req.user)
    let userId = req.user._id;
    const isExist = req.user.courses.findIndex(courseId => courseId.toString() == courseid)
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
    const course = await Course.findById(courseid);
    // console.log({
    //     // subscriptionIndex,
    //     course   });
    const subscriptionIndex = course.subscription.findIndex(sub => sub.userId === userId);
    if (subscriptionIndex === -1) {

    }
    const courseUpdate = { $addToSet: { subscription: { userId: userId.toString(), role: null } } }

    const userUpdate = { $push: { courses: courseid } };

    const { course: updatedCourse, user } = await updateCourseAndUser(courseid, userId, courseUpdate, userUpdate);
    
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
