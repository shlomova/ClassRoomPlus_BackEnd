// approve student
const asyncHandler = require('express-async-handler');
const Course = require('../models/coursesModel');
const User = require('../models/usersModel');

exports.verfieduser = asyncHandler(async (req, res, next) => {
   
    const { _Id } = req.params;
    const user = await User.findById(_Id);
   
    
    await User.updateOne({ _id: _Id }, { $set: { verifi: true } });
    console.log(user);
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User verified'
    });
});



exports.approveStudent = asyncHandler(async (req, res,) => {
    const { courseId, studentId } = req.query;
    let course = await Course.findById(courseId);
    
    // Validate the course and subscription array
    if (!course) {
        return res.status(404).json({
            status: 'fail',
            message: 'Course not found'
        });
    }
    let found = false;
    let i = 0;
    for (i = 0; i < course.subscription.length; i++) {
        if (course.subscription[i].userId == studentId) {
            found = true;
            break; // Exit the loop once the user is found and role is updated
        }
    }
        // Handle the case where the userId was not found in the subsc ription
    if (!found) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found in course subscriptions'
        });
    }
    console.log(i,course.subscription);
    // Update the course with the new role
    course = await Course.updateOne({ _id: courseId, 'subscription.userId': studentId },
                    { $set: { 'subscription.$.role': 'student' } }, { new: true });
    console.log(i,course.subscription);
        res.status(200).json({
        status: 'success',
        message: 'Student approved'
    });
}
);

