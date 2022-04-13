const mongoose = require("mongoose");
const subcategorySchema = require("./Subcat");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  set_name: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  subcat: [subcategorySchema],
  name_search: {
    type: String,
    required: true,
  },
  set_name_search: {
    type: String,
    required: true,
  },
  language_search: {
    type: String,
    required: true,
  },
  releaseYear_search: {
    type: String,
    required: true,
  },
  searchOn: {
    type: String,
    required: true,
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
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false
  },
  popularity: {
    type: Number,
    required: true
  }
})

module.exports = cardSchema;