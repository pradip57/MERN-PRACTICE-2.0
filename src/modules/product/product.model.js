const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
    },
    slug: {
      type: String,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      min: 100,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
    },
    afterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null,
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    images: [
      {
        type: String,
      },
    ],
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
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
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
