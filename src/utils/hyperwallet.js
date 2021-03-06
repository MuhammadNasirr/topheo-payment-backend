import Hyperwallet from "hyperwallet-sdk";
import { env } from "../env";
import { uuid } from "uuidv4";
const debug = require("debug")("payment:utils:hyperwallet");
var rp = require("request-promise");

export const hyperwalletClient = new Hyperwallet({
  username: env.hyperwallet.apiUsername,
  password: env.hyperwallet.apiPassword,
  programToken: env.hyperwallet.programToken,
  server: env.hyperwallet.apiUrl,
});

export const createBankAccount = ({
  userToken,
  bankAccountId,
  bankAccountPurpose,
  branchId,
  transferMethodCurrency,
  transferMethodCountry,
  postalCode,
  stateProvince,
  addressLine1,
  city,
  profileType,

  country,
  firstName,
  lastName,
}) => {
  debug({ userToken });
  return new Promise((resolve, reject) => {
    hyperwalletClient.createBankAccount(
      userToken,
      {
        bankAccountId,
        bankAccountPurpose,
        branchId,
        transferMethodCountry,
        transferMethodCurrency,
        type: "BANK_ACCOUNT",
        postalCode,
        stateProvince,
        addressLine1,
        city,
        profileType,
        country,
        lastName,
        firstName,
      },
      function (errors, body) {
        if (errors) {
          debug(errors);
          console.log("BANK ERROR", errors);
          reject({
            status: "fail",
            message: "Failed to created bank account",
            errors: errors,
          });
        } else {
          debug("Bank account successfully created");

          debug(body);
          resolve({
            status: "success",
            message: "Bank Account Created",
          });
        }
      }
    );
  });
};

export const createPayment = ({
  amount,
  destinationToken,
  programToken,
  purpose,
  currency,
}) => {
  debug({ amount, destinationToken, programToken, purpose, currency });
  return new Promise((resolve, reject) => {
    hyperwalletClient.createPayment(
      {
        amount,
        clientPaymentId: uuid(),
        currency,
        destinationToken,
        programToken,
        purpose,
      },
      function (errors, body) {
        if (errors) {
          debug(errors);
          console.log("CREATE PAYMENT ERR::", errors);
          reject({
            status: "fail",
            message: "Failed to create Payment",
            errors,
          });
        } else {
          debug("Payment successfully created");
          debug(body);
          console.log("HP.com", body);
          resolve({ status: "fail", message: "Payment successfully created" });
        }
      }
    );
  });
};

export const createTransferMethod = ({
  userToken,
  jsonCacheToken,
  transferMethodConfiguration,
}) => {
  debug(userToken, jsonCacheToken, transferMethodConfiguration);
  return new Promise((resolve, reject) => {
    debug({ userToken, jsonCacheToken });

    hyperwalletClient.createTransferMethod(
      userToken,
      jsonCacheToken,
      transferMethodConfiguration,
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject({
            status: "fail",
            message: "Failed to create transfer method",
          });
        } else {
          debug("Transfer method successfully created");
          debug(body);
          resolve({
            status: "fail",
            message: "Transfer method successfully created",
          });
        }
      }
    );
  });
};

export const createUser = ({ clientId, firstName, lastName, email }) => {
  debug({ clientId, firstName, lastName, email });
  return new Promise((resolve, reject) => {
    hyperwalletClient.createUser(
      {
        clientUserId: clientId,
        firstName,
        lastName,
        email,
        profileType: "INDIVIDUAL",
      },
      function (errors, body, res) {
        if (errors) {
          console.log("HYPERWALLET USER ERROR", errors);
          debug(errors);
          let index = errors.findIndex(
            (a) => a.code === "DUPLICATE_CLIENT_USER_ID"
          );

          if (index > -1) {
            let userToken = errors[index].relatedResources[0];
            resolve({ token: userToken });
          }

          reject({ status: "fail", message: "Failed to create user", errors });
        } else {
          debug("Create User Response");
          resolve({ status: "success", data: body });
        }
      }
    );
  });
};

export const getBankAccount = ({ userToken, bankAccountToken }) => {
  debug({ userToken });
  return new Promise((resolve, reject) => {
    hyperwalletClient.getBankAccount(
      userToken,
      bankAccountToken,
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject({
            status: "fail",
            message: "Failed to fetch bank account",
            errors,
          });
        } else {
          debug("Bank account successfully fetched");
          debug(body);
          resolve({ status: "success", data: body });
        }
      }
    );
  });
};

export const getUser = ({ userToken }) => {
  debug({ userToken });
  return new Promise((resolve, reject) => {
    hyperwalletClient.getUser(userToken, function (errors, body) {
      if (errors) {
        debug(errors);
        reject({ status: "fail", message: "Get User Failed" });
      } else {
        debug("Get User Response");
        resolve({ status: "success", data: body });
      }
    });
  });
};

export const getUserJwt = (userToken) => {
  debug({ userToken });
  return new Promise((resolve, reject) => {
    hyperwalletClient.getAuthenticationToken(
      userToken,
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject({ status: "fail", message: "Authentication Failed", errors });
        } else {
          debug("Get User Response");
          resolve({ status: "success", data: body });
        }
      }
    );
  });
};

export const listBalanceForUser = ({ userToken }) => {
  debug({ userToken });
  return new Promise((resolve, reject) => {
    hyperwalletClient.listBalancesForUser(
      userToken,
      null,
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject({ status: "fail", message: "Fetching User balance Failed" });
        } else {
          debug("User balance fetched successfully");
          debug(body);
          resolve({ status: "success", data: body });
        }
      }
    );
  });
};

export const listBankAccounts = ({ userToken }) => {
  debug({ userToken });
  return new Promise((resolve, reject) => {
    hyperwalletClient.listBankAccounts(
      userToken,
      null,
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject({
            status: "fail",
            message: "Fetching User bank accounts failed",
            errors,
          });
        } else {
          debug("User banks fetched successfully");
          debug(body);
          resolve({ status: "success", data: body });
        }
      }
    );
  });
};

export const transferToBank = async ({
  transferMethodToken,
  amount,
  userToken,
}) => {
  debug({ transferMethodToken, amount, userToken });
  debug("hyperwallet config", env.hyperwallet);

  const bankAccount = await getBankAccount({
    userToken: userToken,
    bankAccountToken: transferMethodToken,
  });
  const user = await getUser({ userToken });
  console.log(user);
  if (!bankAccount)
    throw new Error({ status: "fail", message: "Invalid transfer method" });
  console.log(bankAccount);
  const transferData = {
    clientTransferId: uuid(),
    destinationAmount: 0.1,
    destinationCurrency: bankAccount.data.transferMethodCurrency,
    notes: "Partial-Balance Transfer",
    memo: "TransferClientId56387",
    sourceToken: userToken,
    destinationToken: transferMethodToken,
  };
  const auth = {
    username: env.hyperwallet.apiUsername,
    password: env.hyperwallet.apiPassword,
    grant_type: "password",
  };

  const authParams = new Buffer(auth.username + ":" + auth.password).toString(
    "base64"
  );

  const transferInqRes = await rp({
    uri: `${env.hyperwallet.apiUrl}/rest/v3/transfers`,
    method: "POST",
    body: JSON.stringify(transferData),
    headers: {
      Authorization: "Basic " + authParams,
      "Content-Type": "application/json",
    },
  });
  debug("transferInqRes", transferInqRes);

  console.log("TTR:::::", transferInqRes);

  const { foreignExchanges } = JSON.parse(transferInqRes);
  debug("foreignExchanges", foreignExchanges);
  let amountToTransfer = amount;
  if (foreignExchanges) {
    const getUsdRate = foreignExchanges.find(
      ({ sourceCurrency }) => sourceCurrency === "USD"
    ).rate;
    debug("getUsdRate", getUsdRate);

    amountToTransfer = parseFloat(getUsdRate * parseFloat(amount)).toFixed(2);
  }
  debug("amountToTransfer", amountToTransfer);

  const transferRes = await rp({
    uri: `${env.hyperwallet.apiUrl}/rest/v3/transfers`,
    method: "POST",
    body: JSON.stringify({
      ...transferData,
      destinationAmount: amountToTransfer,
    }),
    headers: {
      Authorization: "Basic " + authParams,
      "Content-Type": "application/json",
    },
  });

  debug("transferRes", transferRes);

  const { token: transferToken } = JSON.parse(transferRes);

  const commitTransferUri = `${env.hyperwallet.apiUrl}/rest/v3/transfers/${transferToken}/status-transitions`;

  debug("commitTransferUri", commitTransferUri);

  const commitTransferRes = await rp({
    uri: commitTransferUri,
    method: "POST",
    body: JSON.stringify({
      transition: "SCHEDULED",
      notes: "Completing the Transfer",
    }),
    headers: {
      Authorization: "Basic " + authParams,
      "Content-Type": "application/json",
    },
  });

  debug("commitTransferRes", commitTransferRes);

  return { status: "success", message: "transfered" };
};

export const updateUser = ({
  userToken,
  address_line1,
  address_line2,
  postal_code,
  city,
}) => {
  debug({ userToken, address_line1, address_line2, postal_code, city });
  return new Promise((resolve, reject) => {
    hyperwalletClient.updateUser(
      userToken,
      {
        addressLine1: address_line1,
        addressLine2: address_line2,
        postalCode: postal_code,
        city,
      },
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject({ status: "fail", message: "Update User Failed" });
        } else {
          debug("Update User Response", body);
          resolve({ status: "success", data: body });
        }
      }
    );
  });
};

// Create user both hyperwallet and brain tree together
//
