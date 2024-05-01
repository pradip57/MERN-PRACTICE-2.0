require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => {
    console.log("Mongo db succesfully connected");
  })
  .catch((err) => {
    console.log("Error connecting mongoDb");
    process.exit(1);
  });
