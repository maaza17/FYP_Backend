const mongoose = require('mongoose')
const salerecSchema = require('./SalesRecord')

const salesSchema = new mongoose.Schema({
    card_id: {
        type: String,
        required: true
    },
    grading_company: {
        psa: [[salerecSchema]],
        bgs: [[salerecSchema]],
        cgc: [[salerecSchema]]
    },
    datecreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastmodified: {
        type: Date,
        required: true,
        default: Date.now()
    }
})
module.exports = salesSchema