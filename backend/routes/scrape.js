const express = require("express");
const router = express.Router();
const { scrapeArticles } = require("../controllers/scrapeArticles");
const { scrapeArticleDetails } = require("../controllers/articleDetails");
const { updateArticles } = require("../controllers/updateArticles");

router.post("/", scrapeArticles);

router.post("/details", scrapeArticleDetails);

router.post("/update", updateArticles);

module.exports = router;
