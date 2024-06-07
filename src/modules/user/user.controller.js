class UserController {
  index =async (req, res, next) => {
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
            role:req.query.role
        };
      }

      const data = await productServ.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await productServ.count({ filter: filter });

    } catch (exception) {
      next(exception);
    }
  };
}

const userCtrl = new UserController();
module.exports = userCtrl;
