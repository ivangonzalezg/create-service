/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// routes

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static("build"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

let database = { url: process.env.DB_REMOTE, server: "remote" };
if (process.argv[2] === "dev") database = { url: process.env.DB_LOCAL, server: "local" };

mongoose.set("useCreateIndex", true);
mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to ${database.server} database`);
  });

// paths

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening: ${port}`);
