const mongoose = require('mongoose')

const MSV_RankingSchema = new mongoose.Schema({
    set_selected: {
        type: String,
        required: true
    },
    card_id: {
        type: String,
        required: true
    },
    psa_10_value: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sub_cat: {
        type: String,
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    set_name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    csvOrder: {
        type: Number,
        required: true
    }
})

module.exports = MSV_RankingSchema