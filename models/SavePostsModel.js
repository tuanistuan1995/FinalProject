var mongoose = require("mongoose");

const SavePostsSchema = new mongoose.Schema({
    posts_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    { timestamps: true }
);

const SavePosts = mongoose.model("SavePosts", SavePostsSchema);

module.exports = SavePosts;
