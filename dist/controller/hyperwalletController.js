"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.transferToBank = exports.listBankAccounts = exports.listBalanceForUser = exports.getUser = exports.getBankAccount = exports.createUser = exports.createTransferMethod = exports.createPayment = exports.createBankAccount = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var hyperwallet = _interopRequireWildcard(require("../utils/hyperwallet"));

var createBankAccount = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, userToken, bankAccountId, bankAccountPurpose, branchId, transferMethodCurrency, transferMethodCountry, account;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, userToken = _req$body.userToken, bankAccountId = _req$body.bankAccountId, bankAccountPurpose = _req$body.bankAccountPurpose, branchId = _req$body.branchId, transferMethodCurrency = _req$body.transferMethodCurrency, transferMethodCountry = _req$body.transferMethodCountry;
            _context.prev = 1;
            _context.next = 4;
            return hyperwallet.createBankAccount({
              userToken: userToken,
              bankAccountId: bankAccountId,
              bankAccountPurpose: bankAccountPurpose,
              branchId: branchId,
              transferMethodCurrency: transferMethodCurrency,
              transferMethodCountry: transferMethodCountry
            });

          case 4:
            account = _context.sent;

            if (!(account.status === "fail")) {
              _context.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log("creating bacnk Account error", _context.t0);
            res.status(400).json(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function createBankAccount(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createBankAccount = createBankAccount;

var createPayment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, amount, destinationToken, programToken, purpose, currency, account;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, amount = _req$body2.amount, destinationToken = _req$body2.destinationToken, programToken = _req$body2.programToken, purpose = _req$body2.purpose, currency = _req$body2.currency;
            _context2.prev = 1;
            _context2.next = 4;
            return hyperwallet.createPayment({
              amount: amount,
              destinationToken: destinationToken,
              programToken: programToken,
              purpose: purpose,
              currency: currency
            });

          case 4:
            account = _context2.sent;

            if (!(account.status === "fail")) {
              _context2.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log("creating payment error", _context2.t0);
            res.status(400).json(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function createPayment(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createPayment = createPayment;

var createTransferMethod = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body3, userToken, jsonCacheToken, transferMethodConfiguration, account;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, userToken = _req$body3.userToken, jsonCacheToken = _req$body3.jsonCacheToken, transferMethodConfiguration = _req$body3.transferMethodConfiguration;
            _context3.prev = 1;
            _context3.next = 4;
            return hyperwallet.createTransferMethod({
              userToken: userToken,
              jsonCacheToken: jsonCacheToken,
              transferMethodConfiguration: transferMethodConfiguration
            });

          case 4:
            account = _context3.sent;

            if (!(account.status === "fail")) {
              _context3.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log("creating payment error", _context3.t0);
            res.status(400).json(_context3.t0);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));

  return function createTransferMethod(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTransferMethod = createTransferMethod;

var createUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body4, clientId, firstName, lastName, email, account;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body4 = req.body, clientId = _req$body4.clientId, firstName = _req$body4.firstName, lastName = _req$body4.lastName, email = _req$body4.email;
            _context4.prev = 1;
            _context4.next = 4;
            return hyperwallet.createUser({
              clientId: clientId,
              firstName: firstName,
              lastName: lastName,
              email: email
            });

          case 4:
            account = _context4.sent;

            if (!(account.status === "fail")) {
              _context4.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log("creating payment error", _context4.t0);
            res.status(400).json(_context4.t0);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function createUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getBankAccount = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$body5, userToken, bankAccountToken, account;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body5 = req.body, userToken = _req$body5.userToken, bankAccountToken = _req$body5.bankAccountToken;
            _context5.prev = 1;
            _context5.next = 4;
            return hyperwallet.getBankAccount({
              userToken: userToken,
              bankAccountToken: bankAccountToken
            });

          case 4:
            account = _context5.sent;

            if (!(account.status === "fail")) {
              _context5.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log("creating payment error", _context5.t0);
            res.status(400).json(_context5.t0);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getBankAccount(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getBankAccount = getBankAccount;

var getUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userToken, account;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userToken = req.body.userToken;
            _context6.prev = 1;
            _context6.next = 4;
            return hyperwallet.getUser({
              userToken: userToken
            });

          case 4:
            account = _context6.sent;

            if (!(account.status === "fail")) {
              _context6.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log("creating payment error", _context6.t0);
            res.status(400).json(_context6.t0);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function getUser(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var listBalanceForUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var userToken, account;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            userToken = req.body.userToken;
            _context7.prev = 1;
            _context7.next = 4;
            return hyperwallet.listBalanceForUser({
              userToken: userToken
            });

          case 4:
            account = _context7.sent;

            if (!(account.status === "fail")) {
              _context7.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log("creating payment error", _context7.t0);
            res.status(400).json(_context7.t0);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));

  return function listBalanceForUser(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.listBalanceForUser = listBalanceForUser;

var listBankAccounts = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var userToken, account;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            userToken = req.body.userToken;
            _context8.prev = 1;
            _context8.next = 4;
            return hyperwallet.listBankAccounts({
              userToken: userToken
            });

          case 4:
            account = _context8.sent;

            if (!(account.status === "fail")) {
              _context8.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log("creating payment error", _context8.t0);
            res.status(400).json(_context8.t0);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));

  return function listBankAccounts(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.listBankAccounts = listBankAccounts;

var transferToBank = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _req$body6, transferMethodToken, amount, userToken, account;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body6 = req.body, transferMethodToken = _req$body6.transferMethodToken, amount = _req$body6.amount, userToken = _req$body6.userToken;
            _context9.prev = 1;
            _context9.next = 4;
            return hyperwallet.transferToBank({
              transferMethodToken: transferMethodToken,
              amount: amount,
              userToken: userToken
            });

          case 4:
            account = _context9.sent;

            if (!(account.status === "fail")) {
              _context9.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            console.log("creating payment error", _context9.t0);
            res.status(400).json(_context9.t0);

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12]]);
  }));

  return function transferToBank(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

exports.transferToBank = transferToBank;

var updateUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var _req$body7, userToken, address_line1, address_line2, postal_code, city, account;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _req$body7 = req.body, userToken = _req$body7.userToken, address_line1 = _req$body7.address_line1, address_line2 = _req$body7.address_line2, postal_code = _req$body7.postal_code, city = _req$body7.city;
            _context10.prev = 1;
            _context10.next = 4;
            return hyperwallet.updateUser({
              userToken: userToken,
              address_line1: address_line1,
              address_line2: address_line2,
              postal_code: postal_code,
              city: city
            });

          case 4:
            account = _context10.sent;

            if (!(account.status === "fail")) {
              _context10.next = 9;
              break;
            }

            throw account;

          case 9:
            res.status(200).json(account);

          case 10:
            _context10.next = 16;
            break;

          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](1);
            console.log("creating payment error", _context10.t0);
            res.status(400).json(_context10.t0);

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 12]]);
  }));

  return function updateUser(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;