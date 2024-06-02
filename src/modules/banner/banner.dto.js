const joi = require("joi");

const bannerCreateDTO = joi.object({
  title: joi.string().min(3).required(),
  link: joi.string().uri().empty(null, "").default(null).optional(),
  status: joi
    .string()
    .pattern(/^(inactive|active)$/)
    .default("inactive"),
});

module.exports = { bannerCreateDTO };
