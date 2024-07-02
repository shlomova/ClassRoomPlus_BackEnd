const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    file: {
        type: String,
        required: true
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
