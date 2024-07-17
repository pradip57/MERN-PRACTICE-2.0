const CartDetailModel = require("./cart-detail.model");

class CartDetailServices {
  transformCartObject = (product, quantity, user) => {
    let currentCartData = {
      buyerId: user._id,
      productId: product._id,
      orderId: null,
      productDetails: {
        title: product.title,
        slug: product.slug,
        price: product.price,
        discount: product.discount,
        afterDiscount: product.afterDiscount,
      },
      quantity: quantity,
      amount: product.afterDiscount * quantity,
      sellerId: product?.sellerId,
      status: "pending",
      isPaid: false,
      createdBy: req.authUser._id,
      updatedBy: req.authUser._id,
    };

    return currentCartData;
  };

  findOne = async (filter) => {
    try{
      const result  = await CartDetailModel.findOne(filter)
      return result

    }catch(exception){
      throw exception
    }
  };
}

const cartDetailServ = new CartDetailServices();
module.exports = cartDetailServ;
