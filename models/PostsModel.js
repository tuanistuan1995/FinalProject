var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PostsSchema = mongoose.Schema({
    title: {
        type: String,
    },
    postImage: {
        type: String,
    },
    //delete: String,
    desc: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    Comment_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likeBy: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            total_Likes: {
                type: Number,
                default: 0,
            },
        }
    ],
    report_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts_report",
    },
});

// PostsSchema.virtual("user", {
//     ref: "User",
//     localField: "_id",
//     foreignField: "posts",
// });

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
