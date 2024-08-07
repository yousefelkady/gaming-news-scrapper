const axios = require("axios");
const cheerio = require("cheerio");
const findSource = require("./findSource");




const scrapeArticle = async function (article) {
  const url = article.link;
  const slug = article.slug;
  const image = article.image;
  const source = findSource(url);
  return axios.get(url).then((result) => {
    const $ = cheerio.load(result.data);
    const page = $.html();
    const title = $("h1.news-title").text();
    const author = $("a.byline-author__name").text().trim();
    const date = $("time").attr("datetime");
    const paragraphs = $(".content-entity-body").find("p");
    let body = "";
    paragraphs.each((_, element) => {
      body += $(element).text();
      body += "\n\n";
    });
    const article = { title, url, slug, author, date, body, image, source };
    console.log("article:", article);
    return article;
  });
};

module.exports = scrapeArticle;
