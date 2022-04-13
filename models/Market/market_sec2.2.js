const mongoose = require("mongoose");

const market_sec22Schema = new mongoose.Schema({
    description: {
        type: [String],
        required: true,
    },
    "90days": {
        type: [Number],
        required: true,
    },
    fullhistory: {
        type: [Number],
        required: true,
    }
});

module.exports = market_sec22Schema;
