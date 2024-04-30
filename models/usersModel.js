const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
   name: {
        type:String,
        required:[true, 'The user must have a name']
    }, 
    email:{
        type:String,
        required:[true , 'Please provide email'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Must be a password'],
        minLength: 8,
        select: false
    },
    confirmPassword:{
        type: String,
        required:[true, 'Please confirm password'],
        minLength: 8,
        validate: {
           validator: function(el){
                return el === this.password
             },
            message:"Passwords not match"
        }
    },
    role:{
        type: String,
        enum:{
            values:['admin', 'student','teacher'],
            message: 'The role must be either "admin", "student" or"teacher"'
        },
        default:'student'
    }

})
//document middleware - runs b4 actual document is saved in the db "THIS REFERS TO A CURRENT DOCUMENT"
userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    return next()
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    this.confirmPassword = undefined
    next()
})
userSchema.methods.checkPassword = async function(password,hashedPassword){
    const checkPasword = await bcrypt.compare(password, hashedPassword)
    return checkPasword
}
const user = mongoose.model('user', userSchema)

module.exports = user