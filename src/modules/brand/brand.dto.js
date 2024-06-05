const joi = require("joi");

const brandCreateDTO = joi.object({
  title: joi.string().min(3).required(),

  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
  homeSection: joi.boolean().default(false),
});

const brandUpdateDTO = joi.object({
  title: joi.string().min(3).required(),

  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
  image: joi.string().empty(null, "").optional().default(null),
  homeSection: joi.boolean().default(false),
});

module.exports = { brandCreateDTO, brandUpdateDTO };
