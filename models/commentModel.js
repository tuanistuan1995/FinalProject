var mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  timeCreated: {
    type: Date,
    default: () => Date.now(),
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },
});

// CommentSchema.virtual("comment_article", {
//   ref: "Articles",
//   localField: "_id",
//   foreignField: "comments",
// });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
