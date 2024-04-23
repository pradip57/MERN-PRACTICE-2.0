require('dotenv').config()
const nodemailer = require("nodemailer");

class MailServices {
  transport;

  constructor() {
    try {
      this.transport = nodemailer.createTransport({

        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD
        }
      });
    } catch (exception) {
      console.log(exception);
      throw new Error("Error connecting email services");
    }
  }
}

const mailServc = new MailServices();
module.exports = mailServc;
