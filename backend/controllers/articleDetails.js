const News = require("../models/news");
const scrapeArticle = require("../util/getArticleDetails");
const { saveArticleDetails } = require("../util/saveArticle");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.scrapeArticleDetails = async (req, res, next) => {
  try {
    const articles = await News.find();
    for (const article of articles) {
      const articlePage = await scrapeArticle(article);
      console.log("article page: ", articlePage);
      const savedArticle = await saveArticleDetails(articlePage);
      if (savedArticle) {
        console.log(
          `Article Details Added for Article : ${savedArticle.title}`
        );
      }
      await delay(15000); // Delay for 15 seconds (15000 milliseconds)
    }
    res.send("Srapped Articles Details Successfully");
  } catch (error) {
    console.error(error);
    res.send("Error Happend while Scraping Articles Details");
  }
};
