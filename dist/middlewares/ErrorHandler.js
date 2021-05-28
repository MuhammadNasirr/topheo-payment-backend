"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.errorRoutes = void 0;

var _express = require("express");

var errorRoutes = (0, _express.Router)();
exports.errorRoutes = errorRoutes;
errorRoutes.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
errorRoutes.get("*", function (req, res, next) {
  res.status(404).json({
    message: "Route does not exist"
  });
});

var errorHandler = function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

exports.errorHandler = errorHandler;