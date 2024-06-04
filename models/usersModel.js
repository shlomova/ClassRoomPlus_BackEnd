const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'The user must have a name']
    },
    lastName: {
        type: String,
        required: [true, 'The user must have a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must be a valid password'],
        minLength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm password'],
        minLength: 6,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords not match"
        }
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: 'The role must be either "admin", "user"'
        },
        default: 'user'
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    verify: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        default: ''
    },
    codeCreatedAt: {
        type: Date,
        default: Date.now
    }
});

// פונקציה לבדיקת תוקף הקוד
userSchema.methods.isCodeValid = function() {
    const FIVE_MINUTES = 5 * 60 * 1000; // 5 דקות במילישניות
    const now = Date.now();
    return now - this.codeCreatedAt.getTime() < FIVE_MINUTES;
};

// Document middleware - runs before the actual document is saved in the DB, "this" refers to the current document
userSchema.pre('save', async function(next){

    if(!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.checkPassword = async function(password,hashedPassword){
    const checkPasword = await bcrypt.compare(password, hashedPassword);
    return checkPasword;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
