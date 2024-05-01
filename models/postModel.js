const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
  postid: { type: String, required: [true,"must have a valid id"], unique: true },
  userId: { type: String, required:[true,"must have a valid userid"],unique: true },
  courseId: { type: String, required:[true,"must have a valid classid"],unique: true},
  postData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  dataType: { type: String, enum: ['string', 'emoji', 'file'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;