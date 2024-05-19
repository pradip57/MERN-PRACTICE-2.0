const express = require("express");

require("./db.config");

const mainRoute = require("./routing.config");
const helmet = require("helmet");
const cors = require("cors");
const Joi = require("joi");

const app = express();
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const healthRoute = express.Router();

healthRoute.use("/health", (req, res, next) => {
  res.json({
    result: "Fine health",
    message: "Success",
    meta: null,
  });
});

app.use(healthRoute);

app.use(mainRoute);

app.use("/", (req, res, next) => {
  next({ code: 404, message: "Sorry not found" });
});

app.use((error, req, res, next) => {
  let codeStatus = error.code || 500;
  let data = error.data || null;
  let message = error.message || "Internal Server Error";
  console.log(error);

  if (error instanceof Joi.ValidationError) {
    codeStatus = 422;
    message = "Validation Error";
    data = {};

    const errorDetails = error.details;
    if (Array.isArray(errorDetails)) {
      errorDetails.map((errObject) => {
        data[errObject.context.label] = errObject.message;
      });
    }
  }

  if (+codeStatus === 11000) {
    codeStatus = 400;
    data = {};
    const field = Object.keys(error.keyPattern);
    field.map((fieldname) => {
      data[fieldname] = fieldname + " must be unique";
    });
    message = " Validation failed";
  }

  res.status(codeStatus).json({
    result: data,
    message: message,
    meta: null,
  });
});

module.exports = app;
