var mongoose = require("mongoose");
var MessagesSchema = mongoose.Schema({
    Avata: String,
    username: String,
    text: {
        type: String,
        default: false,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
