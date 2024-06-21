const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError')
const User = require('./../models/usersModel')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const SendMailToUser  = require('./../utils/sendMail')
 

const signToken = id => {
    return jwt.sign({id, iat: Date.now()}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true
    }

    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
exports.register = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const {email, password, confirmPassword, firstName, lastName, phone, role} = req.body
    if (!email || !password || !confirmPassword || !firstName || !lastName || !phone || !role) return next(new AppError(403, 'Request details are missing'))
    const newUser = await User.create({email, password, confirmPassword, firstName, lastName, phone, role}).catch(err => {
        return next(new AppError(403, 'Email or Phone already exists'))
    })
    console.log( 111,newUser)
    // send mail to verify email
    SendMailToUser.SendMailToUser(newUser)

})

exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) return next(new AppError(403, 'Email or password is missing'))
    const user = await User.findOne({email}).select('+password')
    if (!user || !await user.checkPassword(password, user.password)) return next(new AppError(403, 'Email or password is not correct 1'))

    createSendToken(user, 201 , res)

})
const protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.cookie.split('=')[1]
    if (!token) return next(new AppError(403, 'Please login '))
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    if (!decoded) return next(new AppError(403, 'Please login '))
    const {id} = decoded
    const user = await User.findById(id)
    if (!user) return next(new AppError(400, 'Please register'))
    req.user = user
    next()
})

exports.restrictTo = (...role) => {
    return async (req, res, next) => {
        if (!role.includes(req.user.role)) {
            
            return next(
                new AppError(403, 'You do not have permission to perform this action')
            );
        }
    };
};



exports.isByUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const user = req.user;
    if (userId !== user._id.toString()) {
        console.log(userId, user._id.toString())
        return next(new AppError(403, 'You are not authorized to perform this action'));
    }
    next();
  });

exports.protect = protect;