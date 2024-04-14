const Joi = require("joi");

class AuthController {
  register = async (req, res, next) => {
    try{
      const payload = req.body;

    

    res.json({
      result: payload,
      message: "Successful Register",
      meta: null,
    });
    }catch(exception){
      next(exception)
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
