const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError')
const User = require('./../models/userModel')




exports.getAllUsers = asyncHandler(async (req, res, next)=>{
   
    const users = await User.find()

    res.status(200).json({
        status:'success',
        users
})
})