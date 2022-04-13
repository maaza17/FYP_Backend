const mongoose = require("mongoose");

const market_secE4Schema = new mongoose.Schema({
    set_name: {
        type: String,
        required: true,
    },
    sales_vol: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    }
});

module.exports = market_secE4Schema;
