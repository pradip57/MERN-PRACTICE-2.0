const joi = require("joi");

const productCreateDTO = joi.object({
  title: joi.string().min(2).required(),
  summary: joi.string().required(),
  description: joi.string().allow(null, "").optional().default(null),
  price: joi.number().min(100).required(),
  discount: joi.number().min(0).max(90).default(0),
  brand: joi.string().allow(null, "").optional().default(null),
  isFeatured: joi.boolean().default(false),
  categories: joi
    .array()
    .items(joi.string())
    .allow(null, "")
    .optional()
    .default(null),
  sellerId: joi.string().allow(null, "").default(null),
  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
  images: joi
    .array()
    .items(joi.string().allow(null, ""))
    .allow(null, "")
    .default(null)
    .optional(),
});

const productUpdateDTO = joi.object({
  title: joi.string().min(2).required(),
  summary: joi.string().required(),
  description: joi.string().allow(null, "").optional().default(null),
  price: joi.number().min(100).required(),
  discount: joi.number().min(0).max(90).default(0),
  brand: joi.string().allow(null, "").optional().default(null),
  isFeatured: joi.boolean().default(false),
  categories: joi
    .array()
    .items(joi.string())
    .allow(null, "")
    .optional()
    .default(null),
  sellerId: joi.string().allow(null, "").default(null),
  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
  images: joi
    .array()
    .items(joi.string().allow(null, ""))
    .allow(null, "")
    .default(null)
    .optional(),
});

module.exports = { productCreateDTO, productUpdateDTO };
