const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
    card_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    }
})

module.exports = subcategorySchema