const mongoose = require("mongoose");

const market_sec5TableSchema = new mongoose.Schema({
    week_time: {
        type: Date,
        required: true,
    },
    sales_volume: {
        type: Number,
        required: true,
    },
    psa_perc: {
        type: Number,
        required: true,
    },
    cgc_perc: {
        type: Number,
        required: true,
    },
    bgs_perc: {
        type: Number,
        required: true,
    },
});

module.exports = market_sec5TableSchema;
