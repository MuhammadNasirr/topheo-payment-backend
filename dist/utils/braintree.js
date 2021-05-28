"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pay = exports.generateToken = exports.findCustomer = exports.createCustomer = exports.gateway = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _braintree = _interopRequireDefault(require("braintree"));

var _env = require("../env");

var gateway = new _braintree["default"].BraintreeGateway({
  environment: _braintree["default"].Environment.Sandbox,
  merchantId: _env.env.braintree.merchantId,
  publicKey: _env.env.braintree.publicKey,
  privateKey: _env.env.braintree.privateKey
});
exports.gateway = gateway;

var createCustomer = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var id, firstName, lastName, email;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id, firstName = _ref.firstName, lastName = _ref.lastName, email = _ref.email;
            _context.next = 3;
            return gateway.customer.create({
              id: id,
              firstName: firstName,
              lastName: lastName,
              email: email
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createCustomer(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createCustomer = createCustomer;

var findCustomer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var customer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return gateway.customer.find(id);

          case 3:
            customer = _context2.sent;
            console.log("braintree: Find Customer:::", customer);
            return _context2.abrupt("return", customer);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log("braintree: Find Customer Err:::", _context2.t0);
            return _context2.abrupt("return", null);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function findCustomer(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); // gateway.customer.delete("j785mJAZowR1OD0UOrWFzEn1KGv1");


exports.findCustomer = findCustomer;

var generateToken = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(customerId) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return gateway.clientToken.generate({
              customerId: customerId
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function generateToken(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var pay = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5) {
    var amount, paymentNonce;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            amount = _ref5.amount, paymentNonce = _ref5.paymentNonce;
            _context4.next = 3;
            return gateway.transaction.sale({
              amount: amount,
              paymentMethodNonce: paymentNonce,
              options: {
                submitForSettlement: true
              }
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function pay(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.pay = pay;