const File = require('../models/filemodels.js')
const asyncHandler = require('express-async-handler')

exports.createFile = asyncHandler(async (req, res, next) => {
    const file = await File.create({ file: `/Files/${req.file.filename}` })
    res.status(201).json({
        status: 'success',
        file
    });
})

exports.getFilesByCourse = (async (req, res, next) => {
    const { email, username } = req.body
    console.log({ email, username });
    const file = await File.create({ file: `/Files/${req.file.filename}` })
    res.send(file)
})

exports.getFile = (async (req, res, next) => {
    const { email, username } = req.body
    console.log({ email, username });
    const file = await File.create({ file: `/Files/${req.file.filename}` })
    res.send(file)
})

exports.deleteFile = (async (req, res, next) => {
    const { email, username } = req.body
    console.log({ email, username });
    const file = await File.create({ file: `/Files/${req.file.filename}` })
    res.send(file)
})
