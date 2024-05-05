const axios = require("axios");
const cheerio = require("cheerio");

const scrapePage = async function (url) {
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
    const article = { title, author, date, body };
    console.log("article:", article);
    return article;
  });
};

module.exports = scrapePage;
