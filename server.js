const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const gamespotRouter = require("./routes/gamespot");
const scrappingRouter = require("./routes/scrape");
const mongoose = require("mongoose");
const slugify = require("slugify")
const axios = require("axios");
const cheerio = require("cheerio");
const db = mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log(error, "Happened");
  });
//const mongoose = require("mongoose");
app.use("/gamespot", gamespotRouter);
app.use("/scrape", scrappingRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
require("dotenv").config();

app.get("/", async (req, res, next) => {
  const articles = [];
  axios
    .get(`https://www.gamespot.com/news/?page=1`)
    .then((result) => {
      const $ = cheerio.load(result.data);
      const page = $.html();
      $(".card-item__content", page).each(function () {
        const title = $(this).find("h4").text();
        const link =
          "https://www.gamespot.com" + $(".card-item__link").attr("href");
        const slug = slugify(title, {
          lower: true,
          strict: true,
        });
        const result = { title, link, slug };
        articles.push(result);
      });

      res.send(articles);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log(`Listening on Port 3000`);
});
