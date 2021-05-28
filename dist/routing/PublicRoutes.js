"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRouter = void 0;

var _express = require("express");

var _authController = require("../controller/authController");

var _smsController = require("../controller/smsController");

var publicRouter = (0, _express.Router)();
exports.publicRouter = publicRouter;
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
publicRouter.post("/sms/send", _smsController.sendSms);
publicRouter.post("/auth/sendOtp", _authController.createOtp);
publicRouter.post("/auth/verifyOtp", _authController.verifyOtp); // define the about route