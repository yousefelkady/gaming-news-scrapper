const mongoose = require("mongoose");
const Article = require("../models/article");
const News = require("../models/news");
const scrapePage = require("../util/getArticleDetails");


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.scrapeArticleDetails = async (req, res, next) => {
  try {
    const articles = await News.find().limit(2);
    for (const article of articles) {
      const articlePage = await scrapePage(article.link);
      console.log("article page: ", articlePage);

      const articl = new Article({
        title: article.title,
        slug: article.slug,
        link: article.link,
        body: articlePage.body,
        publishDate: articlePage.date,
        author: articlePage.author,
      });

      await articl.save();
      console.log(`Article Details Added for Article : ${articl.slug}`);

      // Introduce a delay between each iteration
      await delay(15000); // Delay for 15 seconds (15000 milliseconds)
    }
    res.send("Srapped Articles Details Successfully");
  } catch (error) {
    console.error(error);
    res.send(error)
  }
};

