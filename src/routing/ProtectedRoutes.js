import { Router } from "express";
import * as hyperController from "../controller/hyperwalletController";
import * as braintreeController from "../controller/braintreeController";
import authMiddleware from "../middlewares/AuthMiddleware";

let protectedRouter = Router();
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  // authMiddleware(req, res, next);
  // if()
  next();
});

protectedRouter.post(
  "/hyperwallet/create/bankAccount",
  authMiddleware,
  hyperController.createBankAccount
);

protectedRouter.post(
  "/hyperwallet/create/payment",
  authMiddleware,
  hyperController.createPayment
);

protectedRouter.post(
  "/hyperwallet/create/transfermethod",
  authMiddleware,
  hyperController.createTransferMethod
);

protectedRouter.post(
  "/hyperwallet/create/user",
  authMiddleware,
  hyperController.createUser
);

protectedRouter.post(
  "/hyperwallet/bankAccount",
  authMiddleware,
  hyperController.getBankAccount
);

protectedRouter.post(
  "/hyperwallet/user",
  authMiddleware,
  hyperController.getUser
);

protectedRouter.post(
  "/hyperwallet/user/balance",
  authMiddleware,
  hyperController.listBalanceForUser
);
protectedRouter.post(
  "/hyperwallet/bankAccount/list",
  authMiddleware,
  hyperController.listBankAccounts
);

protectedRouter.post(
  "/hyperwallet/transfer/bank",
  authMiddleware,
  hyperController.transferToBank
);

protectedRouter.put(
  "/hyperwallet/user/update",
  authMiddleware,
  hyperController.updateUser
);

protectedRouter.post(
  "/checkout/start",
  authMiddleware,
  braintreeController.initializePaymentProcess
);

protectedRouter.post(
  "/checkout/pay",
  authMiddleware,
  braintreeController.processPaymentNonce
);

protectedRouter.post(
  "/bank/create",
  authMiddleware,
  braintreeController.createBankAccount
);

protectedRouter.get(
  "/bank/:userId",
  authMiddleware,
  braintreeController.getBankAccount
);

protectedRouter.get(
  "/hyperwallet/token/:userId",
  authMiddleware,
  braintreeController.getAuthToken
);

export { protectedRouter };
