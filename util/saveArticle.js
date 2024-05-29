const News = require("../models/news");
const Article = require("../models/article");

module.exports.saveArticle = async (article) => {
  try {
    const articleDocument = new News({
      title: article.title,
      link: article.link,
      slug: article.slug,
    });
    const result = await articleDocument.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports.saveArticleDetails = async (article) => {
  try {
    console.log("new article details are being added for this article",article.body);
    const articleDocument = new Article({
      title: article.title,
      slug: article.slug,
      link: article.link,
      body: article.body,
      publishDate: article.date,
      author: article.author,
    });
    const result = await articleDocument.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};
