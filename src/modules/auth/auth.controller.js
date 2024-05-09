require("dotenv").config();
const Joi = require("joi");

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

  login = (req, res, next) => {
    res.json({
      result: "Login",
      message: "Successful Login",
      meta: null,
    });
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
}

const authCtrl = new AuthController();

module.exports = authCtrl;
