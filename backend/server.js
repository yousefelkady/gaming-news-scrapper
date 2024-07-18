const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const gamespotRouter = require("./routes/gamespot");
const scrappingRouter = require("./routes/scrape");
const searchRouter = require("./routes/search");
const mongoose = require("mongoose");
const slugify = require("slugify");
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
dotenv.config();
app.use("/gamespot", gamespotRouter);
app.use("/scrape", scrappingRouter);
app.use("/search", searchRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const port = process.env.PORT;
const db_URI = process.env.DB_URI;
const db = mongoose
  .connect(db_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log(error, "Happened");
  });

app.get("/", async (req, res, next) => {
  res.send("Hello World")
});


app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
