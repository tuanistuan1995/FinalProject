var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Avata: {
        type: String,
    },
    Phone: {
        type: String,
    },
    Address: {
        type: String,
    },
    DoB: {
        type: String,
    },
    Accept_friend: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    posts:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
    },
    // list_friend: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Friend",
    // },
    // messages: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Messages",
    // },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;