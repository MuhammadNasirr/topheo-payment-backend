"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTest = exports.processPaymentNonce = exports.getBankAccount = exports.getAuthToken = exports.createBankAccount = exports.initializePaymentProcess = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("../constants");

var _env = require("../env");

var braintree = _interopRequireWildcard(require("../utils/braintree"));

var _firebase = require("../utils/firebase");

var hyperwallet = _interopRequireWildcard(require("../utils/hyperwallet"));

var initializePaymentProcess = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var customerId, customer, user, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            customerId = req.body.customerId;

            if (customerId) {
              _context.next = 4;
              break;
            }

            throw {
              status: "fail",
              message: "No CustomerID provided"
            };

          case 4:
            _context.next = 6;
            return braintree.findCustomer(customerId);

          case 6:
            customer = _context.sent;

            if (customer) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return (0, _firebase.getUserById)(customerId);

          case 10:
            user = _context.sent;
            _context.next = 13;
            return braintree.createCustomer({
              id: customerId,
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email
            });

          case 13:
            customer = _context.sent;

          case 14:
            _context.next = 16;
            return braintree.generateToken(customerId);

          case 16:
            token = _context.sent;
            console.log("InitPayProc:::", token);
            res.status(200).json({
              status: "success",
              clientToken: token.clientToken
            });
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            console.log("InitPayProc Error::::", _context.t0);
            res.status(400).json(_context.t0);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function initializePaymentProcess(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.initializePaymentProcess = initializePaymentProcess;

var createBankAccount = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, userId, bankAccountId, bankAccountPurpose, branchId, transferMethodCurrency, transferMethodCountry, postalCode, stateProvince, address, city, profileType, country, user, customer, hyperwalletUser, bankToken, up;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, userId = _req$body.userId, bankAccountId = _req$body.bankAccountId, bankAccountPurpose = _req$body.bankAccountPurpose, branchId = _req$body.branchId, transferMethodCurrency = _req$body.transferMethodCurrency, transferMethodCountry = _req$body.transferMethodCountry, postalCode = _req$body.postalCode, stateProvince = _req$body.stateProvince, address = _req$body.address, city = _req$body.city, profileType = _req$body.profileType, country = _req$body.country;
            _context2.next = 4;
            return (0, _firebase.getUserById)(userId);

          case 4:
            user = _context2.sent;
            console.log(user);
            _context2.next = 8;
            return braintree.createCustomer({
              id: userId,
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email
            });

          case 8:
            customer = _context2.sent;

            if (user.hyperwalletToken) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return hyperwallet.createUser({
              clientId: userId,
              email: user.email,
              firstName: user.firstname,
              lastName: user.lastname
            });

          case 12:
            hyperwalletUser = _context2.sent;
            user.hyperwalletToken = hyperwalletUser.token;

          case 14:
            if (user.hyperwalletBankToken) {
              _context2.next = 19;
              break;
            }

            _context2.next = 17;
            return hyperwallet.createBankAccount({
              userToken: user.hyperwalletToken,
              bankAccountId: bankAccountId,
              bankAccountPurpose: bankAccountPurpose,
              branchId: branchId,
              transferMethodCurrency: transferMethodCurrency,
              transferMethodCountry: transferMethodCountry,
              postalCode: postalCode,
              stateProvince: stateProvince,
              addressLine1: address,
              city: city,
              profileType: profileType,
              country: country,
              lastName: user.lastname,
              firstName: user.firstname
            });

          case 17:
            bankToken = _context2.sent;
            user.hyperwalletBankToken = bankToken.token;

          case 19:
            up = _firebase.Users.child(userId);
            _context2.next = 22;
            return up.update({
              hyperwalletToken: user.hyperwalletToken,
              hyperwalletBankToken: user.hyperwalletBankToken
            });

          case 22:
            res.status(200).json({
              status: "success",
              data: user
            });
            _context2.next = 29;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2["catch"](0);
            console.log("paymentNonce Error::::", _context2.t0);
            res.status(400).json(_context2.t0);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 25]]);
  }));

  return function createBankAccount(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createBankAccount = createBankAccount;

var getAuthToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userId, user, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.params.userId;
            _context3.next = 4;
            return (0, _firebase.getUserById)(userId);

          case 4:
            user = _context3.sent;

            if (user.hyperwalletToken) {
              _context3.next = 7;
              break;
            }

            throw {
              status: "fail",
              message: "User Account does not Exist"
            };

          case 7:
            _context3.next = 9;
            return hyperwallet.getUserJwt(user.hyperwalletToken);

          case 9:
            token = _context3.sent;
            console.log(token, user.hyperwalletToken);
            res.status(200).json({
              status: "success",
              token: token.data.value
            });
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            console.log("paymentNonce Error::::", _context3.t0);
            res.status(400).json(_context3.t0);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));

  return function getAuthToken(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAuthToken = getAuthToken;

var getBankAccount = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userId, user, bank;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.params.userId;
            _context4.next = 4;
            return (0, _firebase.getUserById)(userId);

          case 4:
            user = _context4.sent;

            if (!(!user.hyperwalletToken || !user.hyperwalletBankToken)) {
              _context4.next = 7;
              break;
            }

            throw {
              status: "fail",
              message: "User or User Bank Account does not Exist"
            };

          case 7:
            _context4.next = 9;
            return hyperwallet.getBankAccount({
              userToken: user.hyperwalletToken,
              bankAccountToken: user.hyperwalletBankToken
            });

          case 9:
            bank = _context4.sent;
            res.status(200).json({
              status: "success",
              bank: bank
            });
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            console.log("paymentNonce Error::::", _context4.t0);
            res.status(400).json(_context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function getBankAccount(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getBankAccount = getBankAccount;

var processPaymentNonce = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$body2, amount, paymentNonce, riderId, currency, rider, response, amountToTransfer, payload;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, amount = _req$body2.amount, paymentNonce = _req$body2.paymentNonce, riderId = _req$body2.riderId, currency = _req$body2.currency;

            if (!(!amount || !paymentNonce)) {
              _context5.next = 4;
              break;
            }

            throw {
              status: "fail",
              message: "Amount or Payment Nonce not Provided"
            };

          case 4:
            _context5.next = 6;
            return (0, _firebase.getUserById)(riderId);

          case 6:
            rider = _context5.sent;

            if (!(!rider.hyperwalletToken || !rider.hyperwalletBankToken)) {
              _context5.next = 9;
              break;
            }

            throw {
              status: "fail",
              message: "User or User Bank Account does not Exist"
            };

          case 9:
            _context5.next = 11;
            return braintree.pay({
              amount: amount,
              paymentNonce: paymentNonce
            });

          case 11:
            response = _context5.sent;
            console.log("ProcPayNonce:::", response);

            if (response.success) {
              _context5.next = 15;
              break;
            }

            throw {
              status: "fail",
              message: response.message
            };

          case 15:
            amountToTransfer = parseFloat(amount) * ((100 - _constants.ADMIN_FEE) / 100);
            console.log("HYPPERWALLET_PAYMENT", rider);
            payload = {
              amount: amountToTransfer,
              destinationToken: rider.hyperwalletBankToken,
              currency: currency,
              programToken: _env.env.hyperwallet.programToken,
              purpose: "GP0005"
            };
            console.log("HYPERWALLET_PAYLOAD", payload);
            _context5.next = 21;
            return hyperwallet.createPayment(payload);

          case 21:
            res.status(200).json({
              status: "success",
              message: "Payment Processed successfully"
            });
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](0);
            console.log("paymentNonce Error::::", _context5.t0);
            res.status(400).json(_context5.t0);

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 24]]);
  }));

  return function processPaymentNonce(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.processPaymentNonce = processPaymentNonce;

var loadTest = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var i;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            for (i = 0; i < 50000; i++) {}

            res.status(200).json({
              status: "success"
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function loadTest(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.loadTest = loadTest;