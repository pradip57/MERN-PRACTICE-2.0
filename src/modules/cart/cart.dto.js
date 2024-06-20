const joi = require("joi");

const addToCartDTO = joi.object({
  productId: joi.string().required(),
  quantity: joi.number().min(0).required(),
});

module.exports = { addToCartDTO };
