const userServ = require("./user.service");

class UserController {
  index = async (req, res, next) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 15;
      const skip = (page - 1) * limit;

      let filter = {};

      if (req.query.search) {
        filter = {
          name: new RegExp(req.query.search, "i"),
          email: new RegExp(req.query.search, "i"),
        };
      }

      if (req.query.role) {
        filter = {
          ...filter,
          role: req.query.role,
        };
      }

      const data = await userServ.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await userServ.count({ filter: filter });

      res.json({
        result: data,
        message: "User lists",
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

const userCtrl = new UserController();
module.exports = userCtrl;
