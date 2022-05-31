require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sendResponse = require("./helpers/sendResponse");
const cors = require("cors");
const session = require("express-session");

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
require("./mongoose");
require("./helpers/passport.helper");
app.use("/api", indexRouter);

// when req match no route, create error
app.use(function (req, res, next) {
  const error = new Error("Wrong url");
  error.statusCode = 404;
  next(error);
});

// when next(error) called, this func will send error message
app.use(function (err, req, res, next) {
  if (err.statusCode) {
    return sendResponse(
      res,
      err.statusCode,
      false,
      null,
      true,
      "Url not found"
    );
  } else {
    return sendResponse(
      res,
      500,
      false,
      null,
      err.message,
      "Internal server error"
    );
  }
});

module.exports = app;
