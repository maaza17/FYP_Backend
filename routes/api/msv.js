const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()


const MSV_ChartSchema = require('../../models/MSV/MSV_Chart')
const MSV_RankingSchema = require('../../models/MSV/MSV_Ranking')

MSV_ChartModel = new mongoose.model('msv_chart', MSV_ChartSchema)
MSV_RankingModel = new mongoose.model('msv_ranking', MSV_RankingSchema)

router.get('/getSets', (req, res) => {
    MSV_ChartModel.find().distinct('set_name', (err, docs) => {
        if(err){
            return res.status(400).json({
                error: true,
                message: err.message
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'Distinct set names found.',
                data: docs
            })
        }
    })
})

router.post('/getChartData', (req, res) => {
    let selected = req.body.selected
    if(selected.length > 0){
        MSV_ChartModel.find({set_name: {$in : selected}}, (err, docs) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: err.message
                })
            } else {
                return res.status(200).json({
                    error: false,
                    message: 'Chart data for selected sets found.',
                    data: docs
                })
            }
        })
    } else {
        return res.status(200).json({
            error: false,
            message: 'No sets selected.',
            data: []
        })
    }
})

router.post('/getTopCards', (req, res) => {
    let selected = req.body.selected
    if(selected.length > 0){
        MSV_RankingModel.find({set_selected: {$in : selected}}, (err, docs) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: err.message
                })
            } else {
                return res.status(200).json({
                    error: false,
                    message: 'Top 20 cards for selected sets found respectively.',
                    data: docs
                })
            }
        })
    } else {
        return res.status(200).json({
            error: false,
            message: 'No sets selected.',
            data: []
        })
    }
})

module.exports = router