const BrandModel = require("./brand.model");
const slugify = require("slugify");

class brandServices {
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

      data.slug = slugify(data.title, {
        lower: true,
      });
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
      const brandData = new BrandModel(data);
      return await brandData.save();
    } catch (exception) {
      throw exception;
    }
  };

  count = async ({ filter }) => {
    try {
      const countData = await BrandModel.countDocuments(filter);
      return countData;
    } catch (exception) {
      throw exception;
    }
  };

  listAll = async ({ limit, skip, filter = {} }) => {
    try {
      const response = await BrandModel.find(filter)
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
      const data = await BrandModel.findOne(filter);
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
      const updateBrand = await BrandModel.findOneAndUpdate(filter, {
        $set: data,
      });
      return updateBrand;
    } catch (exception) {
      throw exception;
    }
  };

  deleteOne = async (filter) => {
    try {
      const response = await BrandModel.findOneAndDelete(filter);
      if (!response) {
        throw { code: 404, message: "Brand doesnot exists" };
      }
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getForHome = async () => {
    try {
      const data = await BrandModel.find({
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

const brandServ = new brandServices();
module.exports = brandServ;
