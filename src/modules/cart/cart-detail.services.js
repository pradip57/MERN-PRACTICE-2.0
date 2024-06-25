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
  };

  findOne = () =>{
    
  }
}

const cartDetailServ = new CartDetailServices();
module.exports = cartDetailServ;
