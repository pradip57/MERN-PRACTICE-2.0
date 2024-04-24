require("dotenv").config()
const Joi = require("joi");
const { generateRandomString } = require("../../utilities/helpers");
const bcryptjs = require("bcryptjs");
const mailServc = require("../../services/mail.services");


class AuthController {
  register = async (req, res, next) => {
    try {
      const payload = req.body;

      payload.password = bcryptjs.hashSync(payload.password, 10);
      payload.status = "inactive";
      payload.activationToken = generateRandomString(50);

      if (req.file) {
        payload.image = req.file.filename;
      }

      const registeredData = {
        ...payload,
        _id: "123",
      };

      await mailServc.sendEmail(
        registeredData.email,
        "Activate your account",
        `Dear ${registeredData.name} <br/>
        <p>You have registered your account with username <strong>${registeredData.email}</strong></p>
        <p>Please click the link below or copy and paste in browser to activate your account</p>
        <a href = "${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
        ${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}
        </a><br/>
        <p>Regards,</p>
        <p>${process.env.SMTP_FROM}</p>
        <p><small><em>Please do not reply to this email via any mail service.</em></small></p>
        `
      );

      res.json({
        result: payload,
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
}

const authCtrl = new AuthController();

module.exports = authCtrl;
