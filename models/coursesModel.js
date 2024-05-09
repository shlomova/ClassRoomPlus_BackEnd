const mongoose = require('mongoose')
const User = require("../models/usersModel");

const courseSchema = new mongoose.Schema({
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
    // two-way
    subscription: {
        type: Array,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            value: ['teacher', 'student'],
        }
    },
    userId: {type: String}
})
courseSchema.pre('save', async function (next) {
    if (!this.isModified('openDate') || !this.isModified('endDate'))
        return next()
    if (this.endDate < this.openDate)
        return next(new Error('End date cannot be earlier than open date'));
    next()
})

const course = mongoose.model('course', courseSchema)

module.exports = course
