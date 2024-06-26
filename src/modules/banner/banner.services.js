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

  transformUpdateData = (req, existingData) => {
    try {
      const data = {
        ...req.body,
      };

      console.log(data);

      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = existingData.image;
      }

      data.updatedBy = req.authUser._id;

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

  count = async ({ filter }) => {
    try {
      const countData = await BannerModel.countDocuments(filter);
      return countData;
    } catch (exception) {
      throw exception;
    }
  };

  listAll = async ({ limit, skip, filter = {} }) => {
    try {
      const response = await BannerModel.find(filter)
        .sort({ _id: "desc" })
        .skip(skip)
        .limit(limit);
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  findOne = async (filter) => {
    try {
      const data = await BannerModel.findOne(filter);
      if (!data) {
        throw { code: 400, message: "Data not found" };
      }
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  update = async (filter, data) => {
    try {
      const updateBanner = await BannerModel.findOneAndUpdate(filter, {
        $set: data,
      });
      return updateBanner;
    } catch (exception) {
      throw exception;
    }
  };

  deleteOne = async (filter) => {
    try {
      const response = await BannerModel.findOneAndDelete(filter);
      if (!response) {
        throw { code: 404, message: "Banner doesnot exists" };
      }
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getForHome = async () => {
    try {
      const data = await BannerModel.find({
        status: "active",
      })
        .sort({ _id: "desc" })
        .limit(10);
      return data;
    } catch (exception) {
      throw exception;
    }
  };
}

const bannerServ = new bannerServices();
module.exports = bannerServ;
