const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {},
  { timestamps: true, autoCreate: true, autoIndex: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
