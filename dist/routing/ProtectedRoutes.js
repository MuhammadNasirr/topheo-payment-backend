"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedRouter = void 0;

var _express = require("express");

var hyperController = _interopRequireWildcard(require("../controller/hyperwalletController"));

var braintreeController = _interopRequireWildcard(require("../controller/braintreeController"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var protectedRouter = (0, _express.Router)();
exports.protectedRouter = protectedRouter;
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now()); // authMiddleware(req, res, next);
  // if()

  next();
});
protectedRouter.post("/hyperwallet/create/bankAccount", _AuthMiddleware["default"], hyperController.createBankAccount);
protectedRouter.post("/hyperwallet/create/payment", _AuthMiddleware["default"], hyperController.createPayment);
protectedRouter.post("/hyperwallet/create/transfermethod", _AuthMiddleware["default"], hyperController.createTransferMethod);
protectedRouter.post("/hyperwallet/create/user", _AuthMiddleware["default"], hyperController.createUser);
protectedRouter.post("/hyperwallet/bankAccount", _AuthMiddleware["default"], hyperController.getBankAccount);
protectedRouter.post("/hyperwallet/user", _AuthMiddleware["default"], hyperController.getUser);
protectedRouter.post("/hyperwallet/user/balance", _AuthMiddleware["default"], hyperController.listBalanceForUser);
protectedRouter.post("/hyperwallet/bankAccount/list", _AuthMiddleware["default"], hyperController.listBankAccounts);
protectedRouter.post("/hyperwallet/transfer/bank", _AuthMiddleware["default"], hyperController.transferToBank);
protectedRouter.put("/hyperwallet/user/update", _AuthMiddleware["default"], hyperController.updateUser);
protectedRouter.post("/checkout/start", _AuthMiddleware["default"], braintreeController.initializePaymentProcess);
protectedRouter.post("/checkout/pay", _AuthMiddleware["default"], braintreeController.processPaymentNonce);
protectedRouter.post("/bank/create", _AuthMiddleware["default"], braintreeController.createBankAccount);
protectedRouter.get("/bank/:userId", _AuthMiddleware["default"], braintreeController.getBankAccount);
protectedRouter.get("/hyperwallet/token/:userId", _AuthMiddleware["default"], braintreeController.getAuthToken);
protectedRouter.get("/loadtest", _AuthMiddleware["default"], braintreeController.loadTest);