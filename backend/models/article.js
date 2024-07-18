const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findSource = require("../util/findSource");

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  publishDate: { type: Date, default: Date.now },
  link: String,
  slug: String,
  image: String,
  source : String
});


const Article = new mongoose.model("Article", articleSchema);

module.exports = Article;
