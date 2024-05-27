const getNumOfPages = require("../util/getNumOfPages");
const getArticlesFromPage = require("../util/getArticlesFromPage");
const { saveArticle } = require("../util/saveArticle");

function delay(t) {
  console.log(`delay called with ${t} milliseconds`);
  return new Promise((resolve) => setTimeout(resolve, t));
}

module.exports.scrapeArticles = async (req, res, next) => {
  const lastPage = await getNumOfPages("https://www.gamespot.com/news/");
  console.log("Last Page is:", lastPage);
  let articles = [];
  for (let i = 0; i < 1; i++) {
    await delay(i * 30000);
    const result = await getArticlesFromPage(i);
    articles = [...articles, ...result];
  }
  articles.forEach((article) => {
    saveArticle(article);
  });
  res.send(`${articles.length} new articles were scrapped for the first time`);
};
