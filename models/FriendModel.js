var mongoose = require("mongoose");
var FriendSchema = mongoose.Schema({
    Avata: String,
    username: String,
    status: {
        type: Boolean,
        default: false,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
