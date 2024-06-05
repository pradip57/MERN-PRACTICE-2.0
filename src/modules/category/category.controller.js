const categoryServ = require("./category.services");

class CategoryController {
  create = async (req, res, next) => {
    try {
      const payload = categoryServ.transformCreateData(req);
      const createdCategory = await categoryServ.store(payload);

      res.json({
        result: createdCategory,
        message: "Category Created Succesfully",
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

      const data = await categoryServ.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await categoryServ.count({ filter: filter });
      res.json({
        result: data,
        message: "Category Lists",
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
      const detail = await categoryServ.findOne({
        _id: req.params.id,
      });

      res.json({
        result: detail,
        message: "Category detail fetched",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      const existingData = await categoryServ.findOne({ _id: req.params.id });
      const payload = categoryServ.transformUpdateData(req, existingData);
      const updateStatus = await categoryServ.update(
        { _id: req.params.id },
        payload
      );

      res.json({
        result: updateStatus,
        message: "Category Updated Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  delete = async (req, res, next) => {
    try {
      const exists = await categoryServ.findOne({ _id: req.params.id });
      const status = await categoryServ.deleteOne({ _id: req.params.id });

      res.json({
        result: status,
        message: "category deleted Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listForHome = async (req, res, next) => {
    try {
      const list = await categoryServ.getForHome();
      res.json({
        result: list,
        message: "Category listed for home page",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;
