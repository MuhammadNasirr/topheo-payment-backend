"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOtp = exports.sendOtp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebase = require("../utils/firebase");

var _twilio = require("../utils/twilio");

var sendOtp = function sendOtp(uid, contact) {
  return new Promise(function (resolve, reject) {
    _firebase.Users.orderByKey().equalTo(uid).once("value", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var json, otp, response, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                json = data.toJSON();

                if (!json) {
                  _context.next = 13;
                  break;
                }

                json = json[uid];
                otp = Math.floor(100000 + Math.random() * 900000);
                _context.next = 7;
                return _twilio.twilioClient.messages.create({
                  from: "+16505176163",
                  to: contact,
                  body: "Your OTP Code is " + otp
                });

              case 7:
                response = _context.sent;
                user = _firebase.Users.child(uid);
                user.update({
                  otp: otp
                });
                resolve({
                  status: "success",
                  message: "OTP sent"
                });
                _context.next = 14;
                break;

              case 13:
                throw "No User Found";

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                reject({
                  status: "fail",
                  message: _context.t0
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};

exports.sendOtp = sendOtp;

var verifyOtp = function verifyOtp(uid, otp) {
  return new Promise(function (resolve, reject) {
    _firebase.Users.orderByKey().equalTo(uid).once("value", /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var json, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                json = data.toJSON();

                if (!json) {
                  _context2.next = 14;
                  break;
                }

                json = json[uid];
                console.log(json.otp, parseInt(otp));

                if (!(json.otp === parseInt(otp))) {
                  _context2.next = 11;
                  break;
                }

                user = _firebase.Users.child(uid);
                user.update({
                  otp: null,
                  isVerified: true
                });
                resolve({
                  status: "success",
                  message: "OTP Verified"
                });
                _context2.next = 12;
                break;

              case 11:
                throw "Wrong OTP";

              case 12:
                _context2.next = 15;
                break;

              case 14:
                throw "No User Found";

              case 15:
                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                reject({
                  status: "fail",
                  message: _context2.t0.message ? _context2.t0.message : _context2.t0
                });

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

exports.verifyOtp = verifyOtp;