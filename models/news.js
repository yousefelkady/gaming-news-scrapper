const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findSource = require("../util/findSource");

const newsSchema = new mongoose.Schema({
  title: String,
  link: String,
  slug: String,
});

newsSchema.virtual("source").get(function () {
  return findSource(this.link);
});

const News = new mongoose.model("New", newsSchema);
module.exports = News;
