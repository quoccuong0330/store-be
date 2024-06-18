const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true, unique: false },
    type: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    rating: { type: Number, require: true },
    description: { type: String, require: true },
    discount: { type: Number, require: true },
    sell: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
