var mongoose = require('mongoose');
var Posts_reportSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
});

const Posts_report= mongoose.model('Posts_report', Posts_reportSchema);

module.exports = Posts_report;