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

      const data = await bannerServ.listAll({ limit: limit, skip: skip, filter:filter });
      const countData = await bannerServ.count({filter:filter});
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
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
