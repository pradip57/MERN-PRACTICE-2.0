require("dotenv").config();
const jwt = require("jsonwebtoken");
const authServ = require("../modules/auth/auth.service");
const auth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      next({ code: 401, message: "Token Access code required" });
    }

    token = token.split(" ").pop();

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const userDetail = await authServ.findOneUser({
      _id: tokenData.sub,
    });

    if (!userDetail) {
      next({ code: 401, message: "User Doesnot exists" });
    }

    req.authUser = userDetail;
    next();
  } catch (exception) {
    next({ code: 401, message: "Unauthorized Access" });
  }
};

module.exports = auth;
