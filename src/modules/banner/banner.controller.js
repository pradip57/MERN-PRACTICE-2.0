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
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
