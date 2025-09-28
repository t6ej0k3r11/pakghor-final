const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  body: { type: String },
  image: { type: String },
  badge: { text: String, filled: Boolean },
  indicator: { type: String }, // price or status
  btn: {
    text: String,
    href: String,
    type: String,
    filled: Boolean,
  },
});

module.exports = mongoose.model("Card", cardSchema);
