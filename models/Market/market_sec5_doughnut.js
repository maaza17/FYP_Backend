const mongoose = require('mongoose')

const market_sec5_doughnut_Schema = new mongoose.Schema({
    psa: {
        type: Number,
        required: true
    },
    bgs: {
        type: Number,
        required: true
    },
    cgc: {
        type: Number,
        required: true
    }
})

module.exports = market_sec5_doughnut_Schema