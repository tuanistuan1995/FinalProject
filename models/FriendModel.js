var mongoose = require("mongoose");
var FriendSchema = mongoose.Schema({
    Avata: {
        type: String,
    },
    name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
