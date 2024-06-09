const productServ = require("./product.services");

class ProductController {
  create = async (req, res, next) => {
    try {
      const payload = await productServ.transformCreateData(req);
      const createdProduct = await productServ.store(payload);

      res.json({
        result: createdProduct,
        message: "Product Created Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  index = async (req, res, next) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 15;
      const skip = (page - 1) * limit;

      let filter = {};

      if (req.query.search) {
        filter = {
          title: new RegExp(req.query.search, "i"),
        };
      }

      const data = await productServ.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await productServ.count({ filter: filter });
      res.json({
        result: data,
        message: "Product Lists",
        meta: {
          limit: limit,
          page: page,
          total: countData,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  show = async (req, res, next) => {
    try {
      const detail = await productServ.findOne({
        _id: req.params.id,
      });

      res.json({
        result: detail,
        message: "Product detail fetched",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      const existingData = await productServ.findOne({ _id: req.params.id });
      const payload = await productServ.transformUpdateData(req, existingData);
      const updateStatus = await productServ.update(
        { _id: req.params.id },
        payload
      );

      res.json({
        result: updateStatus,
        message: "Product Updated Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  delete = async (req, res, next) => {
    try {
      const exists = await productServ.findOne({ _id: req.params.id });
      const status = await productServ.deleteOne({ _id: req.params.id });

      res.json({
        result: status,
        message: "product deleted Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listForHome = async (req, res, next) => {
    try {
      const list = await productServ.getForHome();
      res.json({
        result: list,
        message: "Product listed for home page",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getProductDetailBySlug = async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const filter = {
        slug: slug,
        status: "active",
      };
      const productDetail = await productServ.findOne(filter);
      const relatedFilter = {
        categories: { $in: productDetail.categories },
        _id: { $ne: productDetail._id },
        status: "active",
      };
      const relatedProducts = await productServ.listAll({
        limit: 12,
        skip: 0,
        filter: relatedFilter,
      });
      res.json({
        result: {
          detail: productDetail,
          relatedProduct: relatedProducts,
        },
        message: "Detail of product fetched by slug",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const productCtrl = new ProductController();
module.exports = productCtrl;
