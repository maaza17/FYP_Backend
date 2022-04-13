const mongoose = require("mongoose");

const market_sec6highSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    set_name:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true,
    },
    sold:{
        type:String,
        required:true
    },
    // grading_company:{
    //     type:String,
    //     required:true
    // },
    grade: {
        type: String,
        required: true,
    }
});

module.exports = market_sec6highSchema;
