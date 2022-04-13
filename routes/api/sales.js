const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const salesSchema = require("../../models/Sales");
const salesModel = new mongoose.model("sales", salesSchema);

//Get Sales for Card
router.post("/getAllSalesForOneCard", (req, res) => {
  if (req.body.card_id === null) {
    return res.status(400).json({
      error: false,
      message: "No Data Provided",
      data: null
    });
  }
  else {
    salesModel.findOne({ card_id: req.body.card_id }, (err, docs) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      } else {
        if (docs !== null) {
          let all = [];
          let psa = docs.grading_company.psa
          let cgc = docs.grading_company.cgc
          let bgs = docs.grading_company.bgs
          for (var i = 0; i < psa.length; i++) {
            for (var j = 0; j < psa[i].length; j++) {
              all.push(psa[i][j].date.toISOString().split('T')[0].split("-").join(""))
              // slice(0, 10).split("-").reverse().join("-")
            }
          }
          for (var i = 0; i < cgc.length; i++) {
            for (var j = 0; j < cgc[i].length; j++) {
              all.push(cgc[i][j].date.toISOString().split('T')[0].split("-").join(""))
            }
          }
          for (var i = 0; i < bgs.length; i++) {
            for (var j = 0; j < bgs[i].length; j++) {
              all.push(bgs[i][j].date.toISOString().split('T')[0].split("-").join(""))
            }
          }

          let temp = all.reduce((a, b) => {
            return a > b ? a : b;
          });;

          var year = temp.substring(0, 4);
          var month = temp.substring(4, 6);
          var day = parseInt(temp.substring(6, 8))+1;
          var latest = new Date(year, month-1, day);
          
          return res.status(200).json({
            error: false,
            message: "Here you go good sir",
            data: docs,
            latest: latest,
          });
        } else {
          return res.status(200).json({
            error: false,
            message: "No data found",
            data: {},
          });
        }
      }
    });
  }
});

//Get Sales for Card(to be shown in Pie Chart)
router.post("/getPieChartSales", (req, res) => {
  salesModel.find({ card_id: req.body.card_id }, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Here you go good sir",
        countPSA: 0,
        countBGS: 0,
        countCGC: 0,
      });
    }
  });
});

//Get Statistics for One Card
router.post("/getStatisticsForOneCard", (req, res) => {
  salesModel.find({ card_id: req.body.card_id }, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      // console.log(docs)
      // let psaData = docs.psa;
      // let bgsData = docs.bgs;
      // let cgcData = docs.cgc;
      // console.log(psaData)
      // let psaStats;
      // let bgsStats;
      // let cgcStats;
      // for(var i = 0 ; i<psaData.length ; i++){
      //   let num=psaData[i].grade
      //   psaStats.num.push(psaData[i])
      // }
      return res.status(200).json({
        error: false,
        message: "Here you go good sir",
        // psa:psaStats
      });
    }
  });
});

//Get Latest Sales for Card
router.post("/getLatestSalesForOneCard", (req, res) => {
  salesModel.find({ card_id: req.body.card_id }, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      //Processing to be done here
      return res.status(200).json({
        error: false,
        message: "Here you go good sir",
        data: docs,
      });
    }
  });
});

module.exports = router;
