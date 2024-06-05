const joi = require("joi");

const productCreateDTO = joi.object({
  title: joi.string().min(2).required(),

  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
  parentId: joi.string().allow(null, "").default(null),
});

const productUpdateDTO = joi.object({
  title: joi.string().min(2).required(),

  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
  image: joi.string().empty(null, "").optional().default(null),
  parentId: joi.string().allow(null, "").default(null),
});

module.exports = { productCreateDTO, productUpdateDTO };
