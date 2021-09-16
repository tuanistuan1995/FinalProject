var mongoose = require("mongoose");
var MessagesSchema = mongoose.Schema({
    Avata: {
        type: String,
    },
    name: {
        type: String,
    },
    text: {
        type: String,
        default: false,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    messager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
