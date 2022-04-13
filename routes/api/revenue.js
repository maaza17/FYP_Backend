const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const revenueSchema = require('../../models/Revenue')
const revenueModel = new mongoose.model('revenue', revenueSchema)


router.get('/getaveragedailyrevenue', (req, res) => {
    revenueModel.find({}, (err, docs) => {
        if(err){
            return res.status(err.status).json({
                error: true,
                message: err.message
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'Found daily average revenue!',
                data: docs
            })
        }
    }).sort({date:1})
})

module.exports = router