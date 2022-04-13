const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const MS1Schema = require("../../models/Market/market_sec1");
const MS1Model = new mongoose.model("market_sec1", MS1Schema);

const MS21Schema = require("../../models/Market/market_sec2.1");
const MS21Model = new mongoose.model("market_sec21", MS21Schema);

const MS22Schema = require("../../models/Market/market_sec2.2");
const MS22Model = new mongoose.model("market_sec22", MS22Schema);

const MS3Schema = require("../../models/Market/market_sec3");
const MS3Model = new mongoose.model("market_sec3", MS3Schema);

const MSE4Schema = require("../../models/Market/market_sec4E");
const MSE4Model = new mongoose.model("market_eng_sec4", MSE4Schema);

const MSJ4Schema = require("../../models/Market/market_sec4J");
const MSJ4Model = new mongoose.model("market_jpn_sec4", MSJ4Schema);

const MS5BarSchema = require("../../models/Market/market_sec5Bar");
const MS5BarModel = new mongoose.model("market_bar_sec5", MS5BarSchema);

const MS5TableSchema = require("../../models/Market/market_sec5Table");
const MS5TableModel = new mongoose.model("market_table_sec5", MS5TableSchema);

const MS5DoughnutSchema = require("../../models/Market/market_sec5_doughnut");
const MS5DoughnutModel = new mongoose.model('market_doughnut_sec5', MS5DoughnutSchema)

const MS6highSchema = require("../../models/Market/market_sec6high");
const MS6highModel = new mongoose.model("market_high_sec6", MS6highSchema);

const MS6lowSchema = require("../../models/Market/market_sec6low");
const MS6lowModel = new mongoose.model("market_low_sec6", MS6lowSchema);

const MS6premiumSchema = require("../../models/Market/market_sec6premium");
const MS6premiumModel = new mongoose.model("market_premium_sec6", MS6premiumSchema);

const MS7Schema = require("../../models/Market/market_sec7");
const MS7Model = new mongoose.model("market_sec7", MS7Schema);


//Get Market section 1
router.get("/getMS1", (req, res) => {
    MS1Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    }).sort({date:1});
});

//Get Market section 2.1
router.get("/getMS21", (req, res) => {
    MS21Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 2.2
router.get("/getMS22", (req, res) => {
    MS22Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 3
router.get("/getMS3", (req, res) => {
    MS3Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 4 English
router.get("/getMSE4", (req, res) => {
    MSE4Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    }).sort({percentage: -1});
});

//Get Market section 4 Japan
router.get("/getMSJ4", (req, res) => {
    MSJ4Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    }).sort({percentage: -1});
});

//Get Market section 5 bar
router.get("/getMS5Bar", (req, res) => {
    MS5BarModel.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 5 Table
router.get("/getMS5Table", (req, res) => {
    MS5TableModel.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 5 Doughnut
router.get("/getMS5Doughnut", (req, res) => {
    MS5DoughnutModel.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 6 High
router.get("/getMS6high", (req, res) => {
    MS6highModel.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 6 low
router.get("/getMS6low", (req, res) => {
    MS6lowModel.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});

//Get Market section 6 premium
router.get("/getMS6premium", (req, res) => {
    MS6premiumModel.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    });
});


//Get Market section 7
router.get("/getMS7", (req, res) => {
    MS7Model.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err.message,
            });
        } else {
            return res.status(200).json({
                error: false,
                message: "Here you go good sir",
                count: docs,
            });
        }
    }).sort({rank: 1});
});

module.exports = router;
