const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const News = require("../models/news");
const getNumOfPages = require("../util/getNumOfPages");
const slugify = require("slugify");
const { strict } = require("assert");


const getArticlesFromPage = function (page) {
  const articles = [];
  axios
    .get(`https://www.gamespot.com/news/?page=${page + 1}`)
    .then((result) => {
      const $ = cheerio.load(result.data);
      const page = $.html();
      $(".card-item__content", page).each(function () {
        const title = $(this).find("h4").text();
        const link =
          "https://www.gamespot.com" +
          $(this).find(".card-item__link").attr("href");
        const slug = slugify(title, {
          lower: true,
          strict: true,
        });
        const result = { title, link, slug };
        articles.push(result);
        const article = new News({
          title: title,
          link: link,
          slug: slug,
        });
        article
          .save()
          .then((data) => {
            console.log(`Added Article from Page ${page}`);
            // console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.scrapeArticles = async (req, res, next) => {
  const lastPage = await getNumOfPages("https://www.gamespot.com/news/");
  const articles = [];
  for (let i = 0; i < lastPage; i++) {
    setTimeout(() => {
      getArticlesFromPage(i);
    }, 30000);
  }
  setTimeout(() => {
    res.send("Articles Added");
  }, lastPage * 30000);
};
