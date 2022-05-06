const mongoose = require('mongoose')

const MSV_ChartSchema = new mongoose.Schema({
    set_name:{
        type: String,
        required: true
    },
    psa_10: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_9: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_8: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_7: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_6: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_5: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_4: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_3: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_2: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    },
    psa_1: {
        type:[{
            date: Date,
            value: Number,
            _id: false
        }],
        required: true
    }
})

module.exports = MSV_ChartSchema