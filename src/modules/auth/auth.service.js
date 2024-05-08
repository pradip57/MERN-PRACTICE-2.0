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
    const user = await new UserModel(data);
    return await user.save();
  };
}

const authServ = new AuthServices();
module.exports = authServ;
