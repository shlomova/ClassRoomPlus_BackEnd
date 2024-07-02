const mongoose = require('mongoose');
const User = require("../models/usersModel");

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    courseimg: {
        type: String,
        ref: 'File'
    },
    courseId: {
        type: mongoose.Schema.ObjectId,
    },
    courseName: {
        type: String,
        required: [true, 'The course must have a name']
    },
    openDate: {
        type: Date,
        required: [true, 'Please provide start date'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide end date'],
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    subscription: [subscriptionSchema],
    contents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

courseSchema.pre("save", function (next) {
    this.id = String(this._id);
    next();
});

courseSchema.pre("save", async function (next) {
    if (!this.isModified('userId')) return next();
    
    try {
        const filter = {_id: this.userId};
        const update = {$push: {courses: this._id}};
        await User.findOneAndUpdate(filter, update);
    } catch (error) {
        console.error("Error updating user course:", error);
    }
    next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
