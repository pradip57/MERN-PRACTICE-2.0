const UserModel = require("../user/user.model");
const bcryptjs = require("bcryptjs");
const { generateRandomString } = require("../../utilities/helpers");

class AuthServices {
  transformRegisteredData = (req) => {
    try {
      const payload = req.body;

      payload.password = bcryptjs.hashSync(payload.password, 10);
      payload.status = "inactive";
      payload.activationToken = generateRandomString(50);

      if (req.file) {
        payload.image = req.file.filename;
      }
      return payload;
    } catch (exception) {
      throw exception;
    }
  };

  createUser = async (data) => {
    const user = new UserModel(data);
    return await user.save();
  };

  findOneUser = async (filter) => {
    try {
      const userObject = await UserModel.findOne(filter);
      return userObject;
    } catch (exception) {
      throw exception;
    }
  };

  updateUser = async (userId, data) => {
    try {
      const result = await UserModel.findByIdAndUpdate(userId, { $set: data });
      return result;
    } catch (exception) {
      throw exception;
    }
  };
}

const authServ = new AuthServices();
module.exports = authServ;
