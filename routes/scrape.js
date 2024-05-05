const express = require("express");
const router = express.Router();
const { scrapeArticles } = require("../controllers/scrapeArticles");
const { scrapeArticleDetails } = require("../controllers/articleDetails");

router.post("/", scrapeArticles);

router.post("/details", scrapeArticleDetails);

module.exports = router;
