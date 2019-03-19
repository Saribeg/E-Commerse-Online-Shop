const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribeSchema = new Schema({
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    mail: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Subscribe = mongoose.model("subscribe", SubscribeSchema);
