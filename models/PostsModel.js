var mongoose = require("mongoose");
var PostsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    Avata: {
        type: String,
    },
    Image: {
        type: String,
    },
    //delete: String,
    description: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    Like: {
        user_id: String,
        name: String,
        type: String,
        count: Number,
        require: true,
        default: 0,
    },
    Comment: {
        require: true,
        default: 0,
        type: String,
        user_id: String,
        name: String,
        Avata: String,
        content: String,
        // user_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        // },
        timeCreated: { type: Date },
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    posts_report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts_report",
    },
});

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;