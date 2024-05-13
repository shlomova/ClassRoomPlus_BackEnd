const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: [true, "Must have a valid userid"], unique: true },
  courseId: { type: mongoose.Schema.Types.ObjectId,  ref: "Course", required: [true, "Must have a valid classid"], unique: true },
  postData: {
    type: String,
    required: true,
  },
  dataType: { type: String, enum: ['string', 'emoji', 'file'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
