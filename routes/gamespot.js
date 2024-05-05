const express = require("express");
const router = express.Router();
const { getArticles } = require("../controllers/getArticles");


router.post("/articles", (getArticles));


// router.get("/articles/:id", getArticleByID);

module.exports = router;