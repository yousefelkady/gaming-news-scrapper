const getArticlesFromPage = require("../util/getArticlesFromPage");
const { filterNewArticles } = require("../util/filterNewArticles");
const avgLatest = 4;

function delay(t) {
  console.log(`delay called with ${t} milliseconds`);
  return new Promise((resolve) => setTimeout(resolve, t));
}

module.exports.updateArticles = async (req, res, next) => {
  let articles = [];
  for (let i = 0; i < avgLatest; i++) {
    await delay(i * 30000);
    const result = await getArticlesFromPage(i);
    articles = [...articles, ...result];
  }
  const newArticles = await filterNewArticles(articles);
  const numOfNewArticles = newArticles.length;
  if (numOfNewArticles !== 0) {
    res.send(`${numOfNewArticles} article(s) was added`);
  } else {
    res.send("NO new articles were found");
  }
};
