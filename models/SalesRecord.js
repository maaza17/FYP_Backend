const mongoose = require('mongoose')

const salerecSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    serial_num: {
        type: String,
        required: true
    }
})

module.exports = salerecSchema