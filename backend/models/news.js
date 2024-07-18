const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new mongoose.Schema({
  title: String,
  link: String,
  image: String,
  slug: String,
  source: String
});


const News = new mongoose.model("New", newsSchema);
module.exports = News;
