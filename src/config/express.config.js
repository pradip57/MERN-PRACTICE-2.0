const express = require("express");
const mainRoute = require("./routing.config");
const helmet = require('helmet')
const cors = require('cors')

const app = express();
app.use(helmet())
app.use(cors())

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
  const codeStatus = error.code || 500;
  const data = error.data || null;
  const message = error.message || "Internal Server Error";

  res.status(codeStatus).json({
    result: data,
    message: message,
    meta: null,
  });
});

module.exports = app;
