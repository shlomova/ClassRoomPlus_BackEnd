const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,  ref: "User", required: [true, "Must have a valid userid"] },
  courseId: { type: mongoose.Schema.Types.ObjectId,  ref: "Course", required: [true, "Must have a valid classid"] },
  postData: {
    type: String,
    required: true,
  },
  postFiles: {type: Array, files: {type: String}},
  createdAt: { type: Date, default: Date.now }
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;
