const productServ = require("../product/product.services");
const cartDetailServ = require("./cart-detail.services");

class CartDetailController {
  addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const productDetails = await productServ.findOne({ _id: productId });

      const newCartObject = cartDetailServ.transformCartObject(
        productDetails,
        quantity,
        req.authUser
      );

      const existingCart = await cartDetailServ.findOne({
        status: "pending",
        productId: productId,
        buyerId: req.authUser._id,
        orderId: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const cartDetailCtrl = new CartDetailController();
module.exports = cartDetailCtrl;
