const authRoute = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { uploader, setPath } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const authCtrl = require("./auth.controller");
const { registerDTO, loginDTO } = require("./auth.dto");

authRoute.post(
  "/register",
  setPath("users"),
  uploader.single("image"),
  bodyValidator(registerDTO),
  authCtrl.register
);
authRoute.get("/activate/:token", authCtrl.activate);
authRoute.post("/login", bodyValidator(loginDTO), authCtrl.login);

authRoute.get("/me", auth, authCtrl.getLoggedIn);

authRoute.get("/admin", auth, allowRole("admin"),authCtrl.adminAccess);

module.exports = authRoute;
