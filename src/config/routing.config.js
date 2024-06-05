const authRoute = require("../modules/auth/auth.route");
const bannerRoute = require("../modules/banner/banner.router");
const brandRoute = require("../modules/brand/brand.router");
const categoryRoute = require("../modules/category/category.router");
const productRoute = require("../modules/product/product.router");

const mainRoute = require("express").Router();

mainRoute.use("/auth", authRoute);
mainRoute.use("/banner", bannerRoute);
mainRoute.use("/brand", brandRoute);
mainRoute.use("/category", categoryRoute);
mainRoute.use("/product", productRoute);

module.exports = mainRoute;
