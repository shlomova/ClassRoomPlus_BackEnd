const File = require('../models/filemodels.js')
const asyncHandler = require('express-async-handler')


exports.createFile = asyncHandler(async (req, res, next) => {
    const { email, username } = req.body
    console.log({ email, username });
    const file = await File.create({ file: `/Files/files${req.file.filename}` })
    res.send(file)
})