const allowRole = (allowedRole) => {
  return (req, res, next) => {
    try {
      const loggedInUser = req.authUser;

      if (!loggedInUser) {
        next({ code: 401, message: "Please login first" });
      } else {
        const role = loggedInUser.role;

        if (typeof allowedRole === "string" && allowedRole === role) {
          next();
        } else if (Array.isArray(allowedRole) && allowedRole.includes(role)) {
          next();
        } else {
          next({
            code: 403,
            message: "You donot have permission to access the api",
          });
        }
      }
    } catch (exception) {
      next(exception);
    }
  };
};

module.exports = allowRole;
