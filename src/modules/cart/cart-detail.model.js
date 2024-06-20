const mongoose = require("mongoose");

const CartDetailSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    productDetails: {
      title: String,
      slug:String,
      price: Number,
      discount: Number,
      afterDiscount: Number,
    },
    quantity: {
      type: Number,
      require: true,
      min: 1,
    },
    amount: {
      type: Number,
    },
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "ordered", "cancelled"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, autoCreate: true, autoIndex: true }
);

const CartDetailModel = mongoose.model("CartDetail", CartDetailSchema);

module.exports = CartDetailModel;
