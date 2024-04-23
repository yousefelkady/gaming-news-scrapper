const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const methodOverride = require("method-override");
const { CallbackRegistry } = require("puppeteer");
//const mongoose = require("mongoose");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
require("dotenv").config();

app.get("/", async (req, res, next) => {
  // const html = await axios.get("https://www.gamespot.com/games/");
  // const $ = cheerio.load(html);
  // console.log($.html());
  const articles = [];
  axios
    .get("https://www.gamespot.com/games/")
    .then((result) => {
      console.log(result.data);
      const $ = cheerio.load(result.data);
      const page = $.html();
      $(".card-item__title", page).each(function () {
        const title = $(this).();
        articles.push(title);
      });

      console.log(articles);
      res.send(articles);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log(`Listening on Port 3000`);
});
