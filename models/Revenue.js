const mongoose = require('mongoose')

revenueSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    card_id: {
        type: String,
        required: true
    },
    eng_daily_avg: {
        type: Number,
        required: true
    },
    vojpn_daily_avg: {
        type: Number,
        required: true
    }
})

module.exports = revenueSchema