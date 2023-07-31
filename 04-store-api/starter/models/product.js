const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "value must be given"],
  },
  price: {
    type: Number,
    required: [true, "value must be given"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "marcos", "liddy", "caressa"],
      message: "{VALUE} not supported",
    },
  },
});

module.exports = mongoose.model("Product", productsSchema);
