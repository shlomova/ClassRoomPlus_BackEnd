const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    // two-way
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    file: {
        type: String,
        required: true
    }
})
fileSchema.pre("save", function (next) {
    this.date = Date.now();
    next();
    }
);
const File = mongoose.model('File', fileSchema)

module.exports = File

