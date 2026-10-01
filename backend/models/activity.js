const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#32d583"
    },
    days: {
        type: Map,
        of: Boolean,
        default: {}
    }
});

module.exports = mongoose.model("Activity", activitySchema);