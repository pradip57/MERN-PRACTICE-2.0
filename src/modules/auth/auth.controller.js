class AuthController {
  register = (req, res, next) => {
    const payload = req.body;

    res.json({
      result: payload,
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
