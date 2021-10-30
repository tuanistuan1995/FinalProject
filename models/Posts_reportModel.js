var mongoose = require('mongoose');
const Posts_reportSchema = new mongoose.Schema({
    posts_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
},
    { timestamps: true }
);

const Posts_report= mongoose.model('Posts_report', Posts_reportSchema);

module.exports = Posts_report;