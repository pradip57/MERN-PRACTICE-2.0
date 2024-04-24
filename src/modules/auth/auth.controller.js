const Joi = require("joi");
const { generateRandomString } = require("../../utilities/helpers");
const bcryptjs = require("bcryptjs");

class AuthController {
  register = async (req, res, next) => {
    try {
      const payload = req.body;

      payload.password = bcryptjs.hashSync(payload.password, 10);
      payload.status = "inactive";
      payload.activationToken = generateRandomString(50);

      res.json({
        result: payload,
        message: "Successful Register",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
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
