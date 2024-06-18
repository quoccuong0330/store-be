const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, require: true, unique: true },
        amount: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
      },
    ],
    shippingAddress: [
      {
        fullName: { type: String, require: true, unique: true },
        address: { type: String, require: true },
        city: { type: String, require: true },
        phone: { type: Number, require: true },
      },
    ],
    paymentMethod: { type: String, require: true },
    itemsPrice: { type: Number, require: true },
    shippingPrice: { type: Number, require: true },
    taxPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
