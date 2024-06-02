require("dotenv").config();
const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mailServc = require("../../services/mail.services");
const authServ = require("./auth.service");

class AuthController {
  register = async (req, res, next) => {
    try {
      const data = authServ.transformRegisteredData(req);
      const registeredData = await authServ.createUser(data);

      await mailServc.sendEmail(
        registeredData.email,
        "Activate your account",
        `Dear ${registeredData.name} <br/>
        <p>You have registered your account with username <strong>${registeredData.email}</strong></p>
        <p>Please click the link below or copy and paste in browser to activate your account</p>
        <a href = "${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
        ${process.env.FRONTEND_URL}/auth/activate/${registeredData.activationToken}
        </a><br/>
        <p>Regards,</p>
        <p>${process.env.SMTP_FROM}</p>
        <p><small><em>Please do not reply to this email via any mail service.</em></small></p>
        `
      );

      res.json({
        result: registeredData,
        message: "Successful Register",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userDetail = await authServ.findOneUser({
        email: email,
      });

      if (!userDetail) {
        throw { code: 400, message: "User not found" };
      }

      if (bcryptjs.compareSync(password, userDetail.password)) {
        if (userDetail.status !== "active") {
          throw { code: 400, message: "Your account has not been activated" };
        }

        const accessToken = jwt.sign(
          { sub: userDetail._id },
          process.env.JWT_SECRET
        );

        const refreshToken = jwt.sign(
          {
            sub: userDetail._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.json({
          result: {
            detail: {
              _id: userDetail._id,
              name: userDetail.name,
              email: userDetail.email,
              status: userDetail.status,
              role: userDetail.role,
            },
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          message: "Logged In succesfully",
          meta: null,
        });
      } else {
        throw { code: 400, message: "Credentials doesnot match" };
      }
    } catch (exception) {
      next(exception);
    }
  };

  activate = async (req, res, next) => {
    try {
      const token = req.params.token;
      const associatedUser = await authServ.findOneUser({
        activationToken: token,
      });
      //ToDO:identify user

      if (!associatedUser) {
        throw { code: 400, message: "Token doesnot exists" };
      }
      //status : active
      //activateToken: null
      const updateResult = await authServ.updateUser(associatedUser._id, {
        activationToken: null,
        status: "active",
      });
      res.json({
        result: updateResult,
        message: "Account activated succesfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedIn = (req, res, next) => {
    const loggedInUser = req.authUser;
    const response = {
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      status: loggedInUser.status,
      role: loggedInUser.role,
      image: loggedInUser.image,
    };

    res.json({
      result: response,
      message: "Your profile",
      meta: null,
    });
  };

  adminAccess = async (req, res, next) => {
    try {
      res.json({
        result: "admin access",
        message: "I am admin",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const authCtrl = new AuthController();

module.exports = authCtrl;
