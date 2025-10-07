import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  body: { type: String },
  image: { type: String },
  badge: {
    text: String,
    filled: Boolean,
  },
  indicator: { type: String },
  btn: {
    text: String,
    href: String,
    type: String,
    filled: Boolean,
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
