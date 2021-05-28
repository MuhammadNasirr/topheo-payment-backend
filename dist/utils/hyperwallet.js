"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.transferToBank = exports.listBankAccounts = exports.listBalanceForUser = exports.getUserJwt = exports.getUser = exports.getBankAccount = exports.createUser = exports.createTransferMethod = exports.createPayment = exports.createBankAccount = exports.hyperwalletClient = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _hyperwalletSdk = _interopRequireDefault(require("hyperwallet-sdk"));

var _env = require("../env");

var _uuidv = require("uuidv4");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var debug = require("debug")("payment:utils:hyperwallet");

var hyperwalletClient = new _hyperwalletSdk["default"]({
  username: _env.env.hyperwallet.apiUsername,
  password: _env.env.hyperwallet.apiPassword,
  programToken: _env.env.hyperwallet.programToken,
  server: _env.env.hyperwallet.apiUrl
});
exports.hyperwalletClient = hyperwalletClient;

var createBankAccount = function createBankAccount(_ref) {
  var userToken = _ref.userToken,
      bankAccountId = _ref.bankAccountId,
      bankAccountPurpose = _ref.bankAccountPurpose,
      branchId = _ref.branchId,
      transferMethodCurrency = _ref.transferMethodCurrency,
      transferMethodCountry = _ref.transferMethodCountry,
      postalCode = _ref.postalCode,
      stateProvince = _ref.stateProvince,
      addressLine1 = _ref.addressLine1,
      city = _ref.city,
      profileType = _ref.profileType,
      country = _ref.country,
      firstName = _ref.firstName,
      lastName = _ref.lastName;
  debug({
    userToken: userToken
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.createBankAccount(userToken, {
      bankAccountId: bankAccountId,
      bankAccountPurpose: bankAccountPurpose,
      branchId: branchId,
      transferMethodCountry: transferMethodCountry,
      transferMethodCurrency: transferMethodCurrency,
      type: "BANK_ACCOUNT",
      postalCode: postalCode,
      stateProvince: stateProvince,
      addressLine1: addressLine1,
      city: city,
      profileType: profileType,
      country: country,
      lastName: lastName,
      firstName: firstName
    }, function (errors, body) {
      if (errors) {
        debug(errors);
        console.log("BANK ERROR", errors);
        reject({
          status: "fail",
          message: "Failed to created bank account",
          errors: errors
        });
      } else {
        debug("Bank account successfully created");
        debug(body);
        resolve({
          status: "success",
          message: "Bank Account Created"
        });
      }
    });
  });
};

exports.createBankAccount = createBankAccount;

var createPayment = function createPayment(_ref2) {
  var amount = _ref2.amount,
      destinationToken = _ref2.destinationToken,
      programToken = _ref2.programToken,
      purpose = _ref2.purpose,
      currency = _ref2.currency;
  debug({
    amount: amount,
    destinationToken: destinationToken,
    programToken: programToken,
    purpose: purpose,
    currency: currency
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.createPayment({
      amount: amount,
      clientPaymentId: (0, _uuidv.uuid)(),
      currency: currency,
      destinationToken: destinationToken,
      programToken: programToken,
      purpose: purpose
    }, function (errors, body) {
      if (errors) {
        debug(errors);
        console.log("CREATE PAYMENT ERR::", errors);
        reject({
          status: "fail",
          message: errors[0].message
        });
      } else {
        debug("Payment successfully created");
        debug(body);
        console.log("HP.com", body);
        resolve({
          status: "fail",
          message: "Payment successfully created"
        });
      }
    });
  });
};

exports.createPayment = createPayment;

var createTransferMethod = function createTransferMethod(_ref3) {
  var userToken = _ref3.userToken,
      jsonCacheToken = _ref3.jsonCacheToken,
      transferMethodConfiguration = _ref3.transferMethodConfiguration;
  debug(userToken, jsonCacheToken, transferMethodConfiguration);
  return new Promise(function (resolve, reject) {
    debug({
      userToken: userToken,
      jsonCacheToken: jsonCacheToken
    });
    hyperwalletClient.createTransferMethod(userToken, jsonCacheToken, transferMethodConfiguration, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Failed to create transfer method"
        });
      } else {
        debug("Transfer method successfully created");
        debug(body);
        resolve({
          status: "fail",
          message: "Transfer method successfully created"
        });
      }
    });
  });
};

exports.createTransferMethod = createTransferMethod;

var createUser = function createUser(_ref4) {
  var clientId = _ref4.clientId,
      firstName = _ref4.firstName,
      lastName = _ref4.lastName,
      email = _ref4.email;
  debug({
    clientId: clientId,
    firstName: firstName,
    lastName: lastName,
    email: email
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.createUser({
      clientUserId: clientId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      profileType: "INDIVIDUAL"
    }, function (errors, body, res) {
      if (errors) {
        console.log("HYPERWALLET USER ERROR", errors);
        debug(errors);
        var index = errors.findIndex(function (a) {
          return a.code === "DUPLICATE_CLIENT_USER_ID";
        });

        if (index > -1) {
          var userToken = errors[index].relatedResources[0];
          resolve({
            token: userToken
          });
        }

        reject({
          status: "fail",
          message: errors[0].message
        });
      } else {
        debug("Create User Response");
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
};

exports.createUser = createUser;

var getBankAccount = function getBankAccount(_ref5) {
  var userToken = _ref5.userToken,
      bankAccountToken = _ref5.bankAccountToken;
  debug({
    userToken: userToken
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.getBankAccount(userToken, bankAccountToken, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Failed to fetch bank account"
        });
      } else {
        debug("Bank account successfully fetched");
        debug(body);
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
};

exports.getBankAccount = getBankAccount;

var getUser = function getUser(_ref6) {
  var userToken = _ref6.userToken;
  debug({
    userToken: userToken
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.getUser(userToken, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Get User Failed"
        });
      } else {
        debug("Get User Response");
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
};

exports.getUser = getUser;

var getUserJwt = function getUserJwt(userToken) {
  debug({
    userToken: userToken
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.getAuthenticationToken(userToken, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Authentication Failed"
        });
      } else {
        debug("Get User Response");
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
};

exports.getUserJwt = getUserJwt;

var listBalanceForUser = function listBalanceForUser(_ref7) {
  var userToken = _ref7.userToken;
  debug({
    userToken: userToken
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.listBalancesForUser(userToken, null, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Fetching User balance Failed"
        });
      } else {
        debug("User balance fetched successfully");
        debug(body);
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
};

exports.listBalanceForUser = listBalanceForUser;

var listBankAccounts = function listBankAccounts(_ref8) {
  var userToken = _ref8.userToken;
  debug({
    userToken: userToken
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.listBankAccounts(userToken, null, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Fetching User bank accounts failed"
        });
      } else {
        debug("User banks fetched successfully");
        debug(body);
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
};

exports.listBankAccounts = listBankAccounts;

var transferToBank = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref9) {
    var transferMethodToken, amount, userToken, bankAccount, transferData, auth, authParams, transferInqRes, _JSON$parse, foreignExchanges, getUsdRate, amountToTransfer, transferRes, _JSON$parse2, transferToken, commitTransferUri, commitTransferRes;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transferMethodToken = _ref9.transferMethodToken, amount = _ref9.amount, userToken = _ref9.userToken;
            debug({
              transferMethodToken: transferMethodToken,
              amount: amount,
              userToken: userToken
            });
            debug("hyperwallet config", _env.env.hyperwallet);
            _context.next = 5;
            return getBankAccount({
              userToken: userToken,
              bankAccountToken: transferMethodToken
            });

          case 5:
            bankAccount = _context.sent;

            if (bankAccount) {
              _context.next = 8;
              break;
            }

            throw new Error({
              status: "fail",
              message: "Invalid transfer method"
            });

          case 8:
            transferData = {
              clientTransferId: uuidV4(),
              destinationAmount: 0.1,
              destinationCurrency: bankAccount.transferMethodCurrency,
              notes: "Partial-Balance Transfer",
              memo: "TransferClientId56387",
              sourceToken: userToken,
              destinationToken: transferMethodToken
            };
            auth = {
              username: _env.env.hyperwallet.apiUsername,
              password: _env.env.hyperwallet.apiPassword,
              grant_type: "password"
            };
            authParams = new Buffer(auth.username + ":" + auth.password).toString("base64");
            _context.next = 13;
            return rp({
              uri: "".concat(_env.env.hyperwallet.apiUrl, "/rest/v3/transfers"),
              method: "POST",
              body: JSON.stringify(transferData),
              headers: {
                Authorization: "Basic " + authParams,
                "Content-Type": "application/json"
              }
            });

          case 13:
            transferInqRes = _context.sent;
            debug("transferInqRes", transferInqRes);
            _JSON$parse = JSON.parse(transferInqRes), foreignExchanges = _JSON$parse.foreignExchanges;
            debug("foreignExchanges", foreignExchanges);
            getUsdRate = foreignExchanges.find(function (_ref11) {
              var sourceCurrency = _ref11.sourceCurrency;
              return sourceCurrency === "USD";
            }).rate;
            debug("getUsdRate", getUsdRate);
            amountToTransfer = parseFloat(getUsdRate * amount).toFixed(2);
            debug("amountToTransfer", amountToTransfer);
            _context.next = 23;
            return rp({
              uri: "".concat(_env.env.hyperwallet.apiUrl, "/rest/v3/transfers"),
              method: "POST",
              body: JSON.stringify(_objectSpread(_objectSpread({}, transferData), {}, {
                destinationAmount: amountToTransfer
              })),
              headers: {
                Authorization: "Basic " + authParams,
                "Content-Type": "application/json"
              }
            });

          case 23:
            transferRes = _context.sent;
            debug("transferRes", transferRes);
            _JSON$parse2 = JSON.parse(transferRes), transferToken = _JSON$parse2.token;
            commitTransferUri = "".concat(_env.env.hyperwallet.apiUrl, "/rest/v3/transfers/").concat(transferToken, "/status-transitions");
            debug("commitTransferUri", commitTransferUri);
            _context.next = 30;
            return rp({
              uri: commitTransferUri,
              method: "POST",
              body: JSON.stringify({
                transition: "SCHEDULED",
                notes: "Completing the Transfer"
              }),
              headers: {
                Authorization: "Basic " + authParams,
                "Content-Type": "application/json"
              }
            });

          case 30:
            commitTransferRes = _context.sent;
            debug("commitTransferRes", commitTransferRes);
            return _context.abrupt("return", {
              status: "success",
              message: "transfered"
            });

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function transferToBank(_x) {
    return _ref10.apply(this, arguments);
  };
}();

exports.transferToBank = transferToBank;

var updateUser = function updateUser(_ref12) {
  var userToken = _ref12.userToken,
      address_line1 = _ref12.address_line1,
      address_line2 = _ref12.address_line2,
      postal_code = _ref12.postal_code,
      city = _ref12.city;
  debug({
    userToken: userToken,
    address_line1: address_line1,
    address_line2: address_line2,
    postal_code: postal_code,
    city: city
  });
  return new Promise(function (resolve, reject) {
    hyperwalletClient.updateUser(userToken, {
      addressLine1: address_line1,
      addressLine2: address_line2,
      postalCode: postal_code,
      city: city
    }, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({
          status: "fail",
          message: "Update User Failed"
        });
      } else {
        debug("Update User Response", body);
        resolve({
          status: "success",
          data: body
        });
      }
    });
  });
}; // Create user both hyperwallet and brain tree together
//


exports.updateUser = updateUser;