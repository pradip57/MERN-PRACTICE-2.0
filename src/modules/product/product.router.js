const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const productCtrl = require("./product.controller");
const { productCreateDTO, productUpdateDTO } = require("./product.dto");

const productRoute = require("express").Router();

productRoute.get("/home-list", productCtrl.listForHome);
productRoute.get("/:slug/detail", productCtrl.getProductDetailBySlug);

productRoute
  .route("/")
  .post(
    auth,
    allowRole("admin"),
    setPath("products"),
    uploader.array("images"),
    bodyValidator(productCreateDTO),
    productCtrl.create
  )

  .get(auth, allowRole("admin"), productCtrl.index);

productRoute
  .route("/:id")
  .get(auth, allowRole("admin"), productCtrl.show)
  .put(
    auth,
    allowRole("admin"),
    setPath("products"),
    uploader.array("images"),
    bodyValidator(productUpdateDTO, ["images"]),
    productCtrl.update
  )
  .delete(auth, allowRole("admin"), productCtrl.delete);

module.exports = productRoute;
