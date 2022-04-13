const mongoose = require("mongoose");

const market_sec7Schema = new mongoose.Schema({
    sales_vol: {
        type: Number,
        required: true,
    },
    character: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    }
});

module.exports = market_sec7Schema;
