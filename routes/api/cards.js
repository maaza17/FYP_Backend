const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const cardSchema = require("../../models/Cards");
const cardModel = new mongoose.model("cards", cardSchema);

// INSERT ONE CARD API
router.post("/appropriate_url_here", (req, res) => {
  // First check if the document we're trying to create already exists
  const cardid = req.body.cardid;
  cardModel.findOne({ cardid }, (err, doc) => {
    if (err) {
      // error while checking if document already exists
      return res.status(400).json({
        error: true,
        message: "Error: Could not perform validation check! Please try again.",
      });
    } else if (doc) {
      //document which already exists is found
      return res.status(200).json({
        error: true,
        message: "The document already exists!",
      });
    } else {
      //document does not already exist, we should call mongoose insert function
      const cardobject = {
        name: req.body.name,
        category: req.body.category,
        set_name: req.body.set_name,
        sub_cat: req.body.sub_cat,
        datecreated: req.body.datecreated,
        lastmodified: req.body.lastmodified,
        featured: req.body.featured,
      };

      cardModel.insertOne({ cardobject }, (error, document) => {
        if (error) {
          return res.status(400).json({
            error: true,
            message: error.message,
          });
        } else {
          return res.status(200).json({
            error: false,
            message: "Document succesfully inserted!",
          });
        }
      });
    }
  });
});

//Get All Cards
router.post("/getAllCards", (req, res) => {
  cardModel.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Here you go good sire",
        data: docs,
      });
    }
  });
  // .limit(25)
  // .skip(25 * req.body.paginate);
});


//Get All Sets
router.get("/getAllSets", (req, res) => {
  cardModel.find().distinct('set_name', (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Here you go good sire",
        data: docs,
      });
    }
  });
})

// Get One Card by ID
router.post("/getOneCardByID", (req, res) => {
  const cardid = req.body.cardid;
  cardModel.findOne({ _id: cardid }, (err, doc) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    } else {
      if (doc !== null) {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          data: doc,
        });
      } else {
        return res.status(200).json({
          error: true,
          message: "No data found",
          data: {},
        });
      }
    }
  });
});

// Get Featured Cards
router.post("/getFeaturedCards", (req, res) => {
  cardModel
    .find({ featured: true }, (err, doc) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      } else {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          data: doc,
        });
      }
    })
    .limit(50)
    .skip(50 * req.body.paginate);
});

// Get Latest Cards
router.post("/getLatestCards", (req, res) => {
  let limit = req.body.limit;
  if (limit === null) {
    limit = 25;
  }
  cardModel
    .find({}, (err, doc) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      } else {
        return res.status(200).json({
          error: false,
          message: "Here you go good sir",
          data: doc,
        });
      }
    })
    .sort({ datecreated: "asc" })
    .limit(limit)
    .skip(limit * req.body.paginate);
});

// Search card regex
router.post('/searchall', (req, res) => {
  cardModel.find({ name: { $regex: new RegExp(req.body.query, "i") } }, (err, docs) => {
    if (err) {
      return res.status(err.status).json({
        error: true,
        message: err.message
      })
    } else {
      return res.status(200).json({
        error: false,
        data: docs
      })
    }
  }).limit(10)
})

router.post('/searchshop', (req, res) => {
  //Declare Variables
  let query = req.body.query;
  let setname = req.body.setname;
  let nameSort = Number(req.body.nameSort);
  let dateSort = Number(req.body.dateSort);
  let popularity = Number(req.body.popularity);
  let paginate = req.body.paginate;
  let langArr = [];
  let searchOn;
  let counter = 0;

  //Pre-Process Variables
  if (req.body.japan) langArr.push("Japanese");
  if (req.body.english) langArr.push("English");
  if (query) { searchOn = '\"' + query.split(' ').filter((x) => { return x != '' }).join('\" \"') + '\"' }
  else searchOn = "";
  let find_query = {}

  if (searchOn.length >= 1) {
    if (setname.length === 0) {
      find_query = { $text: { $search: searchOn }, language: { $in: langArr } }
    } else {
      find_query = { $text: { $search: searchOn }, language: { $in: langArr }, set_name: { $in: setname } }
    }
  } else {
    if (setname.length === 0) {
      find_query = { language: { $in: langArr } }
    } else {
      find_query = { language: { $in: langArr }, set_name: { $in: setname } }
    }
  }


  let sorting = {}

  if (popularity === 1) {
    if (nameSort !== 1 && dateSort !== 1) {
      sorting = { popularity: -1 }
    } else if (nameSort == 1 && dateSort !== 1) {
      sorting = { name: nameSort, popularity: -1 }
    } else if (nameSort !== 1 && dateSort == 1) {
      sorting = { releaseYear: dateSort, popularity: -1 }
    } else {
      sorting = { name: nameSort, releaseYear: dateSort, popularity: -1 }
    }
  }
  else {
    if (nameSort !== 1 && dateSort !== 1) {
      sorting = {}
    } else if (nameSort == 1 && dateSort !== 1) {
      sorting = { name: nameSort }
    } else if (nameSort !== 1 && dateSort == 1) {
      sorting = { releaseYear: dateSort }
    } else {
      sorting = { name: nameSort, releaseYear: dateSort }
    }
  }
  console.log(find_query);
  console.log(sorting);

  cardModel.countDocuments(find_query, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: true,
        message: err.message
      })
    }
    else {
      counter = docs;
      // console.log(docs);
      cardModel.find(find_query, (err, docs) => {
        if (err) {
          return res.status(400).json({
            error: true,
            message: err.message
          })
        } else {
          // console.log(docs);
          return res.status(200).json({
            error: false,
            data: docs,
            count: counter
          })
        }
      }).sort(sorting)
        .limit(36)
        .skip(36 * paginate)
    }
  })
})


module.exports = router;