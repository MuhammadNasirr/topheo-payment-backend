"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOtp = exports.createOtp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuidv = require("uuidv4");

var authRepo = _interopRequireWildcard(require("../repos/authRepo"));

var braintree = _interopRequireWildcard(require("../utils/braintree"));

var _firebase = require("../utils/firebase");

var hyperwallet = _interopRequireWildcard(require("../utils/hyperwallet"));

var createOtp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, uid, contact, db;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, uid = _req$body.uid, contact = _req$body.contact;

            if (uid) {
              _context.next = 4;
              break;
            }

            throw {
              status: "fail",
              message: "UID not provided"
            };

          case 4:
            if (contact) {
              _context.next = 6;
              break;
            }

            throw {
              status: "fail",
              message: "contact not provided"
            };

          case 6:
            _context.next = 8;
            return authRepo.sendOtp(uid, contact);

          case 8:
            db = _context.sent;
            res.status(200).json(db);
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log("creating otp error", _context.t0);
            res.status(400).json(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function createOtp(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createOtp = createOtp;

var verifyOtp = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, uid, otp, db, user, customer, hyperwalletUser, up;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, uid = _req$body2.uid, otp = _req$body2.otp;

            if (uid) {
              _context2.next = 4;
              break;
            }

            throw {
              status: "fail",
              message: "UID not provided"
            };

          case 4:
            if (otp) {
              _context2.next = 6;
              break;
            }

            throw {
              status: "fail",
              message: "otp not provided"
            };

          case 6:
            _context2.next = 8;
            return authRepo.verifyOtp(uid, otp);

          case 8:
            db = _context2.sent;
            _context2.next = 11;
            return (0, _firebase.getUserById)(uid);

          case 11:
            user = _context2.sent;
            _context2.next = 14;
            return braintree.findCustomer(uid);

          case 14:
            customer = _context2.sent;

            if (customer) {
              _context2.next = 18;
              break;
            }

            _context2.next = 18;
            return braintree.createCustomer({
              id: uid,
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email
            });

          case 18:
            if (user.hyperwalletToken) {
              _context2.next = 27;
              break;
            }

            _context2.next = 21;
            return hyperwallet.createUser({
              clientId: uid,
              email: user.email,
              firstName: user.firstname,
              lastName: user.lastname
            });

          case 21:
            hyperwalletUser = _context2.sent;
            user.hyperwalletToken = hyperwalletUser.token;
            console.log(hyperwalletUser);
            up = Users.child(userId);
            _context2.next = 27;
            return up.update({
              hyperwalletToken: user.hyperwalletToken
            });

          case 27:
            res.status(200).json(db);
            _context2.next = 34;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t0 = _context2["catch"](0);
            console.log("verify otp error", _context2.t0);
            res.status(400).json(_context2.t0);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 30]]);
  }));

  return function verifyOtp(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyOtp = verifyOtp;