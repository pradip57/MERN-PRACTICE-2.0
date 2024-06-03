const BannerModel = require("./banner.model");

class bannerServices {
  transformCreateData = (req) => {
    try {
      const data = {
        ...req.body,
      };

      console.log(data);

      if (!req.file) {
        throw { code: 400, message: "Image is required" };
      } else {
        data.image = req.file.filename;
      }

      data.createdBy = req.authUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  };

  store = async (data) => {
    try {
      const bannerData = new BannerModel(data);
      return await bannerData.save();
    } catch (exception) {
      throw exception;
    }
  };

  count = async () => {
    try {
      const countData = await BannerModel.countDocuments();
      return countData;
    } catch (exception) {
      throw exception;
    }
  };

  listAll = async ({ limit, skip }) => {
    try {
      const response = await BannerModel.find()
        .sort({ _id: "desc" })
        .skip(skip)
        .limit(limit);
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

const bannerServ = new bannerServices();
module.exports = bannerServ;
