const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    parentId:{
      type:mongoose.Types.ObjectId,
      ref:"Product",
      default:null
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    image: {
      type: String,
      required: true,
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
