const express = require("express");
const router = express.Router();
const { searchArticles } = require("../controllers/searchArticles");

router.post("/", searchArticles);

module.exports = router;
