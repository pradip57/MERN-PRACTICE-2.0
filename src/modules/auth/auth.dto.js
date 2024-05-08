
const Joi = require('joi')
 const registerDTO  = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/
      )
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    role: Joi.string()
      .pattern(/^(seller|customer|admin)$/)
      .required(),
  });
  

  module.exports = {registerDTO}
