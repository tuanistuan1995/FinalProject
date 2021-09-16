var mongoose = require('mongoose');
var Posts_reportSchema = mongoose.Schema({
    name: {
        type: String,
    },
    Avata: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    posts_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
    status: {
        type: Boolean,
        default: false,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
});

const Posts_report= mongoose.model('Posts_report', Posts_reportSchema);

module.exports = Posts_report;