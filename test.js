const axios = require("axios");
const cheerio = require("cheerio");
const slugify = require("slugify");

// const getNumOfPages = async function () {
//   try {
//     const paginationItems = [];
//     const result = await axios.get("https://www.gamespot.com/news/");
//     const $ = cheerio.load(result.data);
//     const page = $.html();
//     $(".paginate__item", page).each(function () {
//       const pageNumber = $(this).find("a").text();
//       paginationItems.push(pageNumber);
//     });
//     console.log("list of pages:", paginationItems);
//     const len = paginationItems.length - 1;
//     return paginationItems[len - 1];
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

const getArticlesFromPage = function (page) {
  const articles = [];
  axios.get(`https://www.gamespot.com/news/?page=1`).then((result) => {
    const $ = cheerio.load(result.data);
    const page = $.html();
    $(".card-item__content", page)
      .each(function () {
        const title = $(this).find("h4").text();
        const link =
          "https://www.gamespot.com" +
          $(this).find(".card-item__link").attr("href");
        const slug = slugify(title, {
          lower: true,
          strict: true,
        });
        const result = { title, link, slug };
        articles.push(result);
        // res.send(articles);
        console.log(articles);
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

getArticlesFromPage();
