const axios = require("axios");
const cheerio = require("cheerio");
const slugify = require("slugify");
const News = require("../models/news");
const { strict } = require("assert");
const findSource = require("./findSource");

const getArticlesFromPage = async function (page) {
  console.log(`Scrape articles function called for page number: ${page + 1}`);
  const articles = [];
  try {
    const result = await axios.get(
      `https://www.gamespot.com/news/?page=${page + 1}`
    );
    const $ = cheerio.load(result.data);
    const pageHtml = $.html();
    $(".card-item", pageHtml).each(function () {
      const title = $(this).find("h4").text();
      const image = $(this).find("img").attr("src");
      const link =
        "https://www.gamespot.com" +
        $(this).find(".card-item__link").attr("href");
      const slug = slugify(title, {
        lower: true,
        strict: true,
      });
      const source = findSource(link);
      const article = { title, link, slug, image, source };
      articles.push(article);
    });
  } catch (err) {
    console.log(err);
  }
  // console.log("Inside the get articles function:", articles);
  return articles;
};

module.exports = getArticlesFromPage;
