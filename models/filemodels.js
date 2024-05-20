const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    file: String
})


const File = mongoose.model('File', fileSchema)

module.exports = File

