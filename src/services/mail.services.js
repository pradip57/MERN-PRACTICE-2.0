require("dotenv").config();
const nodemailer = require("nodemailer");

class MailServices {
  transport;

  constructor() {
    try {
      this.transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } catch (exception) {
      console.log(exception);
      throw new Error("Error connecting email services");
    }
  }

  sendEmail = async (to, subject, message, attachments = null) => {
    try {
      const mailStatus =await this.transport.sendMail({
        to: to,
        from: process.env.SMTP_FROM,
        subject: subject,
        html: message,
        attachments:attachments
      });
      console.log(mailStatus)
      return mailStatus
    } catch (exception) {
      console.log(exception);
      throw new Error("Error sending mail......");
    }
  };
}

const mailServc = new MailServices();
module.exports = mailServc;
