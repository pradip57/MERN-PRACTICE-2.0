const Joi = require("joi");

class AuthController {
  register = (req, res, next) => {
    const payload = req.body;

    const rule = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/
        )
        .required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
      role: Joi.string()
        .pattern(/^(staff|customer)$/)
        .required(),
    });

    const response = rule.validate(payload, { abortEarly: false });

    res.json({
      result: response,
      message: "Successful Register",
      meta: null,
    });
  };

  login = (req, res, next) => {
    res.json({
      result: "Login",
      message: "Successful Login",
      meta: null,
    });
  };
}

const authCtrl = new AuthController();

module.exports = authCtrl;
