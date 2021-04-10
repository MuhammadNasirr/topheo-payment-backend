import Hyperwallet from "hyperwallet-sdk";
import { env } from "../env";
import { uuid } from "uuidv4";
const debug = require("debug")("payment:utils:hyperwallet");

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
      },
      function (errors, body) {
        if (errors) {
          debug(errors);
          reject("Failed to create bank account");
        } else {
          debug("Bank account successfully created");
          debug(body);
          resolve();
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
          reject("Failed to create payment");
        } else {
          debug("Payment successfully created");
          debug(body);
          resolve();
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

    try {
      hyperwalletClient.createTransferMethod(
        userToken,
        jsonCacheToken,
        transferMethodConfiguration,
        function (errors, body) {
          if (errors) {
            debug(errors);
            reject("Failed to create transfer method");
          } else {
            debug("Transfer method successfully created");
            debug(body);
            resolve();
          }
        }
      );
    } catch (error) {
      debug(error);
      throw error;
    }
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
          debug(errors);
          reject("Create User Failed");
        } else {
          debug("Create User Response");
          resolve(body);
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
          reject("Failed to fetch bank account");
        } else {
          debug("Bank account successfully fetched");
          debug(body);
          resolve(body);
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
        reject("Get User Failed");
      } else {
        debug("Get User Response");
        resolve(body);
      }
    });
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
          reject("Fetching User balance Failed");
        } else {
          debug("User balance fetched successfully");
          debug(body);
          resolve(body);
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
          reject("Fetching User bank accounts failed");
        } else {
          debug("User banks fetched successfully");
          debug(body);
          resolve(body);
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

  if (!bankAccount) throw new Error("Invalid transfer method");

  const transferData = {
    clientTransferId: uuidV4(),
    destinationAmount: 0.1,
    destinationCurrency: bankAccount.transferMethodCurrency,
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

  const { foreignExchanges } = JSON.parse(transferInqRes);
  debug("foreignExchanges", foreignExchanges);

  const getUsdRate = foreignExchanges.find(
    ({ sourceCurrency }) => sourceCurrency === "USD"
  ).rate;
  debug("getUsdRate", getUsdRate);

  const amountToTransfer = parseFloat(getUsdRate * amount).toFixed(2);
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

  return true;
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
          reject("Update User Failed");
        } else {
          debug("Update User Response", body);
          resolve(body);
        }
      }
    );
  });
};
