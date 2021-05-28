"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twilioClient = void 0;

var _twilio = _interopRequireDefault(require("twilio"));

var _env = require("../env");

var twilioClient = (0, _twilio["default"])(_env.env.twilio.accountSid, _env.env.twilio.authToken);
exports.twilioClient = twilioClient;