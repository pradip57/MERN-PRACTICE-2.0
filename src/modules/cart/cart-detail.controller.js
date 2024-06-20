const productServ = require("../product/product.services");

class CartDetailController {
  addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const productDetails = await productServ.findOne({ _id: productId });

      let currentCartData = {
        buyerId: req.authUser._id,
        productId: productId,
        orderId: null,
        productDetails: {
          title: productDetails.title,
          slug: productDetails.slug,
          price: productDetails.price,
          discount: productDetails.discount,
          afterDiscount: productDetails.afterDiscount,
        },
        quantity: quantity,
        amount: productDetails.afterDiscount * quantity,
        sellerId: productDetails?.sellerId,
        status: "pending",
        isPaid: false,
        createdBy: req.authUser._id,
        updatedBy: req.authUser._id,
      };
    } catch (exception) {
      next(exception);
    }
  };
}

const cartDetailCtrl = new CartDetailController();
module.exports = cartDetailCtrl;
