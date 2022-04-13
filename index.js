const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cards = require("./routes/api/cards");
const population = require("./routes/api/population");
const sales = require("./routes/api/sales");
const revenue = require("./routes/api/revenue");
const market = require("./routes/api/market");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASS +
      "@fyp.tkd8x.mongodb.net/" +
      process.env.DB_NAME +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/cards", cards);
app.use("/api/sales", sales);
app.use("/api/population", population);
app.use("/api/revenue", revenue);
app.use("/api/market", market);

const port = process.env.PORT || 7000;

app.listen(port,  () => {
console.log('Server running on port ' + port)
})