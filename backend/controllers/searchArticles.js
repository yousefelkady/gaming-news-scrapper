const { saveArticle } = require("../util/saveArticle");
const News = require("../models/news");

const findArticle = async function (query) {
  const article = await News.find(query);
  return article;
};

module.exports.searchArticles = async (req, res, next) => {
  console.log("Request Query : ", req.query);
  const title = req.query.title || "";
  const article = await findArticle({ title: title });
  if (article) {
    res.send(article);
  } else {
    res.status(200).send("Can't find article!");
  }
};
