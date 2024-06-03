const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const bannerCtrl = require("./banner.controller");
const { bannerCreateDTO } = require("./banner.dto");

const bannerRoute = require("express").Router();

bannerRoute
  .route("/")
  .post(
    auth,
    allowRole("admin"),
    setPath("banners"),
    uploader.single("image"),
    bodyValidator(bannerCreateDTO),
    bannerCtrl.create
  )

  .get(auth, allowRole("admin"), bannerCtrl.index);

bannerRoute.route("/:id").get(auth, allowRole("admin"), bannerCtrl.show);

module.exports = bannerRoute;
