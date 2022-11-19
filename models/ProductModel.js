const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: Array,
    default: [],
  },
  color: {
    type: Array,
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  availableQty: {
    type: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("products", productSchema);
