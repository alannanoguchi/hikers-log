const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  imgUrl: { type: String },
  location: { type: String },
  visited: { type: String}
});

module.exports = mongoose.model("Hike", HikeSchema);