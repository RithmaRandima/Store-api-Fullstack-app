const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product Name Must Be Provided"],
  },
  price: {
    type: Number,
    require: [true, "Product Price Must Be Provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    require: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{value} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", ProductSchema);
