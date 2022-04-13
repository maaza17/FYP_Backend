const mongoose = require("mongoose");

const market_sec1Schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    english: {
        type: Number,
        required: true,
    },
    japanese: {
        type: Number,
        required: true,
    }
});

module.exports = market_sec1Schema;
