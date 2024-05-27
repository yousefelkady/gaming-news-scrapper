const slugify = require("slugify");
const News = require("../models/news");
const { strict } = require("assert");
const { saveArticle } = require("./saveArticle");

const checkDocumentExists = async function (query) {
  const found = await News.exists(query);
  const isArticleExist = !!found;
  return isArticleExist;
};

module.exports.filterNewArticles = async (articles) => {
  const numOfDocuments = await News.countDocuments();
  const numOfArticles = articles.length;
  const newArticles = [];
  for (let i = 0; i < numOfArticles; i++) {
    const isArticleExist = await checkDocumentExists({
      title: articles[i].title,
    });
    if (!isArticleExist) {
      console.log("New Article Found!!");
      console.log("Article:", articles[i].title);
      newArticles.push(articles[i]);
    }
  }
  console.log("Number of new Articles are:", newArticles.length);
  newArticles.forEach((article) => {
    console.log("New Article:", article.title);
    saveArticle(article);
  });
  return newArticles;
};
