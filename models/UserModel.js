var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Avatar: {
        type: String,
        default: "/assets/images/profile.png"
    },
    name: {
        type: String,
        minlength: 4,
        maxlength: 10,
    },
    Phone: {
        type: String,
    },
    Address: {
        type: String,
    },
    Age: {
        type: String,
    },
    Accept_friend: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        default: "Male",
    },
    friend: {
        type: Array,
        default: [],
    },
    posts:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    }
    ],  
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    saveposts_id: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SavePosts",
        },
    ],
    // list_friend: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Friend",
    // }],
    
    // messages: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Messages",
    // },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;