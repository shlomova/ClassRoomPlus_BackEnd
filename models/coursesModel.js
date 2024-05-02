const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
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
    }
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


function validateDates(openDate, endDate) {
    const openDateObj = new Date(openDate);
    const endDateObj = new Date(endDate);

    if (!isValidDate(openDateObj) || !isValidDate(endDateObj)) {
        return false;
    }

    if (endDateObj < openDateObj) {
        return false;
    }

    return true;
}

function isValidDate(date) {
    return !isNaN(date.getTime());
}
