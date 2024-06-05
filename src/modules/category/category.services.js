const CategoryModel = require("./category.model");
const slugify = require("slugify");

class categoryServices {
  transformCreateData = (req) => {
    try {
      const data = {
        ...req.body,
      };

      console.log(data);

      if (req.file) {
        data.image = req.file.filename;
      }

      data.slug = slugify(data.title, {
        lower: true,
      });

      if (!data.parentId || data.parentId === "null" || data.parentId === "") {
        data.parentId = null;
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

      if (!data.parentId || data.parentId === "null" || data.parentId === "") {
        data.parentId = null;
      }

      data.updatedBy = req.authUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  };

  store = async (data) => {
    try {
      const categoryData = new CategoryModel(data);
      return await categoryData.save();
    } catch (exception) {
      throw exception;
    }
  };

  count = async ({ filter }) => {
    try {
      const countData = await CategoryModel.countDocuments(filter);
      return countData;
    } catch (exception) {
      throw exception;
    }
  };

  listAll = async ({ limit, skip, filter = {} }) => {
    try {
      const response = await CategoryModel.find(filter)
        .populate("parentId", ["_id", "title", "slug"])
        .populate("createdBy", ["_id", "name", "email", "role"])
        .populate("updatedBy", ["_id", "name", "email", "role"])
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
      const data = await CategoryModel.findOne(filter)
        .populate("parentId", ["_id", "title", "slug"])
        .populate("createdBy", ["_id", "name", "email", "role"])
        .populate("updatedBy", ["_id", "name", "email", "role"]);
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
      const updateCategory = await CategoryModel.findOneAndUpdate(filter, {
        $set: data,
      });
      return updateCategory;
    } catch (exception) {
      throw exception;
    }
  };

  deleteOne = async (filter) => {
    try {
      const response = await CategoryModel.findOneAndDelete(filter);
      if (!response) {
        throw { code: 404, message: "Category doesnot exists" };
      }
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getForHome = async () => {
    try {
      const data = await CategoryModel.find({
        status: "active",
      })
        .populate("parentId", ["_id", "title", "slug"])
        .populate("createdBy", ["_id", "name", "email", "role"])
        .populate("updatedBy", ["_id", "name", "email", "role"])
        .sort({ _id: "desc" })
        .limit(10);
      return data;
    } catch (exception) {
      throw exception;
    }
  };
}

const categoryServ = new categoryServices();
module.exports = categoryServ;
