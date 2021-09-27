var mongoose = require("mongoose");
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
    Like: {
        //user_id: String,
        name: String,
        type: Array,
        count: Number,
        Avata: String,
        require: true,
        default: [],
    },
    Comment: [
        {
        require: true,
        default: [],
        type: String,
        //user_id: String,
        name: String,
        count: Number,
        Avata: String,
        content: String,
        // user_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        // },
        timeCreated: { type: Date },
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    posts_report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts_report",
    },
});

PostsSchema.virtual("user", {
    ref: "User",
    localField: "_id",
    foreignField: "posts",
  });
  

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;