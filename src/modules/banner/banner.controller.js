const bannerServ = require("./banner.services");

class BannerController {
  create = async (req, res, next) => {
    try {
      const payload = bannerServ.transformCreateData(req);
      const createdBanner = await bannerServ.store(payload);

      res.json({
        result: createdBanner,
        message: "Banner Created Succesfully",
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

      const data = await bannerServ.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await bannerServ.count({ filter: filter });
      res.json({
        result: data,
        message: "Banner Lists",
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
      const detail = await bannerServ.findOne({
        _id: req.params.id,
      });

      res.json({
        result: detail,
        message: "Banner detail fetched",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      const existingData = await bannerServ.findOne({ _id: req.params.id });
      const payload = bannerServ.transformUpdateData(req, existingData);
      const updateStatus = await bannerServ.update(
        { _id: req.params.id },
        payload
      );

      res.json({
        result: updateStatus,
        message: "Banner Updated Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  delete = async (req, res, next) => {
    try {
      const exists = await bannerServ.findOne({ _id: req.params.id });
      const status = await bannerServ.deleteOne({ _id: req.params.id });

      res.json({
        result: status,
        message: "banner deleted Succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listForHome = async (req, res, next) => {
    try {
      const list = await bannerServ.getForHome();
      res.json({
        result: list,
        message: "Banner listed for home page",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
