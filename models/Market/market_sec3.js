const mongoose = require("mongoose");

const market_sec1Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    set_name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    psa_10: {
        type: Number,
        required: true,
    },
    psa_9: {
        type: Number,
        required: true,
    },
    psa_8: {
        type: Number,
        required: true,
    },
});

module.exports = market_sec1Schema;
