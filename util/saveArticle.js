const News = require("../models/news");

module.exports.saveArticle = async (article) => {
  const articleDocument = new News({
    title: article.title,
    link: article.link,
    slug: article.slug,
  });
  articleDocument.save().catch((e) => {
    console.log(e);
  });
};
