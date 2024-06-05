const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const brandCtrl = require("./brand.controller");
const { brandCreateDTO, brandUpdateDTO } = require("./brand.dto");

const brandRoute = require("express").Router();

brandRoute.get("/home-list",brandCtrl.listForHome);

brandRoute
  .route("/")
  .post(
    auth,
    allowRole("admin"),
    setPath("brands"),
    uploader.single("image"),
    bodyValidator(brandCreateDTO),
    brandCtrl.create
  )

  .get(auth, allowRole("admin"), brandCtrl.index);

brandRoute
  .route("/:id")
  .get(auth, allowRole("admin"), brandCtrl.show)
  .put(
    auth,
    allowRole("admin"),
    setPath("brands"),
    uploader.single("image"),
    bodyValidator(brandUpdateDTO, ["image"]),
    brandCtrl.update
  )
  .delete(auth, allowRole("admin"), brandCtrl.delete);

module.exports = brandRoute;
