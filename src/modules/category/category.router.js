const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const categoryCtrl = require("./category.controller");
const { categoryCreateDTO, categoryUpdateDTO } = require("./category.dto");

const categoryRoute = require("express").Router();

categoryRoute.get("/home-list", categoryCtrl.listForHome);

categoryRoute
  .route("/")
  .post(
    auth,
    allowRole("admin"),
    setPath("categorys"),
    uploader.single("image"),
    bodyValidator(categoryCreateDTO),
    categoryCtrl.create
  )

  .get(auth, allowRole("admin"), categoryCtrl.index);

categoryRoute
  .route("/:id")
  .get(auth, allowRole("admin"), categoryCtrl.show)
  .put(
    auth,
    allowRole("admin"),
    setPath("categorys"),
    uploader.single("image"),
    bodyValidator(categoryUpdateDTO, ["image"]),
    categoryCtrl.update
  )
  .delete(auth, allowRole("admin"), categoryCtrl.delete);

module.exports = categoryRoute;
