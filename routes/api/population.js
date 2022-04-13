const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const popSchema = require("../../models/Population");
const popModel = new mongoose.model("population", popSchema);

//Get Population
router.post("/getPopulation", (req, res) => {
  popModel.find({ card_id: req.body.card_id }, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      if(docs!==null){
      return res.status(200).json({
        error: false,
        message: "Here you go good sir",
        count: docs,
      });}
      else{
        return res.status(200).json({
        error: false,
        message: "No data found",
        count: docs,
      });
      }
    }
  });
});

//Get Population for one Grade of PSA
router.post("/getPopulationByGrade", (req, res) => {
  popModel.find({ card_id: req.body.card_id }, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      if (req.body.grade === 1) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_1,
        });
      } else if (req.body.grade === 2) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_2,
        });
      } else if (req.body.grade === 3) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_3,
        });
      } else if (req.body.grade === 4) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_4,
        });
      } else if (req.body.grade === 5) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_5,
        });
      } else if (req.body.grade === 6) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_6,
        });
      } else if (req.body.grade === 7) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_7,
        });
      } else if (req.body.grade === 8) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_8,
        });
      } else if (req.body.grade === 9) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_9,
        });
      } else if (req.body.grade === 10) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          count: docs[0].psa_10,
        });
      } else {
        return res.status(200).json({
          error: true,
          message: "Invalid grade",
          count: 0,
        });
      }
    }
  });
});

// //Get Population for PSA
// router.post("/getPopulationForPSA", (req, res) => {
//   popModel.find({ card_id: req.body.card_id }, (err, docs) => {
//     if (err) {
//       return res.status(400).json({
//         error: true,
//         message: err.message,
//       });
//     } else {
  // return res.status(200).json({
  //   error: false,
  //   message: "Here you go good sir",
  //   count: docs[0].psa_total,
  // });
//     }
//   });
// });

// //Get Population for BGS
// router.post("/getPopulationForBGS", (req, res) => {
//   popModel.find({ card_id: req.body.card_id }, (err, docs) => {
//     if (err) {
//       return res.status(400).json({
//         error: true,
//         message: err.message,
//       });
//     } else {
  // return res.status(200).json({
  //   error: false,
  //   message: "Here you go good sir",
  //   count: docs[0].bgs_total,
  // });
//     }
//   });
// });

// //Get Population for CGC
// router.post("/getPopulationForCGC", (req, res) => {
//   popModel.find({ card_id: req.body.card_id }, (err, docs) => {
//     if (err) {
//       return res.status(400).json({
//         error: true,
//         message: err.message,
//       });
//     } else {
  // return res.status(200).json({
  //   error: false,
  //   message: "Here you go good sir",
  //   count: docs[0].cgc_total,
  // });
//     }
//   });
// });

module.exports = router;
