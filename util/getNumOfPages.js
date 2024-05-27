const axios = require("axios");
const cheerio = require("cheerio");

const getNumOfPages = async function (url) {
  try {
    const paginationItems = [];
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    const page = $.html();
    $(".paginate__item", page).each(function () {
      const pageNumber = $(this).find("a").text();
      paginationItems.push(pageNumber);
    });
    // console.log("list of pages:", paginationItems);
    const len = paginationItems.length - 1;
    return paginationItems[len - 1];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = getNumOfPages;