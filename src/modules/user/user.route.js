const userRoute = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const userCtrl = require("./user.controller");

userRoute.route("/").get(auth, allowRole(["admin"]), userCtrl.index);

module.exports = userRoute;
