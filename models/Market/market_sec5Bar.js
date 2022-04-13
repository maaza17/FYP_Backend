const mongoose = require("mongoose");

const market_sec5BarSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    grading_company: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
});

module.exports = market_sec5BarSchema;
