const asyncHandler = require('express-async-handler')
const AppError = require('../utils/AppError')
const User = require('./../models/usersModel')


exports.getAllUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find()
    res.status(200).json({
        status: 'success',
        users
    })
})
exports.updateUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.params
    const user = await User.findByIdAndUpdate
        (_id, req.body, {
            new: true,
            runValidators: true
        })

    if (!user) {
        return next(new AppError(404, 'User not found'))
    }

    res.status(200).json({
        status: 'success',

        user
    })
}
)

