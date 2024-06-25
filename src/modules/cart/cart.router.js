const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const cartDetailCtrl = require("./cart-detail.controller");
const { addToCartDTO } = require("./cart.dto");

const cartRouter = require("express").Router();

cartRouter.post(
  "/add-to-cart",
  auth,
  allowRole(["admin", "customer"]),
  bodyValidator(addToCartDTO),
  cartDetailCtrl.addToCart
);

module.exports = cartRouter;
