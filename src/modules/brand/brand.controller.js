const brandServ = require("./brand.services");

class BrandController {
  create = async (req, res, next) => {
    try {
      const payload = brandServ.transformCreateData(req);
      const createdBrand = await brandServ.store(payload);

      res.json({
        result: createdBrand,
        message: "Brand Created Succesfully",
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

      const data = await brandServ.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await brandServ.count({ filter: filter });
      res.json({
        result: data,
        message: "Brand Lists",
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
      const detail = await brandServ.findOne({
        _id: req.params.id,
      });

      res.json({
        result: detail,
        message: "Brand detail fetched",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      const existingData = await brandServ.findOne({ _id: req.params.id });
      const payload = brandServ.transformUpdateData(req, existingData);
      const updateStatus = await brandServ.update(
        { _id: req.params.id },
        payload
      );

      res.json({
        result: updateStatus,
        message: "Brand Updated Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  delete = async (req, res, next) => {
    try {
      const exists = await brandServ.findOne({ _id: req.params.id });
      const status = await brandServ.deleteOne({ _id: req.params.id });

      res.json({
        result: status,
        message: "brand deleted Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listForHome = async (req, res, next) => {
    try {
      const list = await brandServ.getForHome();
      res.json({
        result: list,
        message: "Brand listed for home page",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;
