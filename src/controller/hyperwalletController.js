import * as hyperwallet from "../utils/hyperwallet";

export const createBankAccount = async (req, res, next) => {
  const {
    userToken,
    bankAccountId,
    bankAccountPurpose,
    branchId,
    transferMethodCurrency,
    transferMethodCountry,
  } = req.body;
  try {
    let account = await hyperwallet.createBankAccount({
      userToken,
      bankAccountId,
      bankAccountPurpose,
      branchId,
      transferMethodCurrency,
      transferMethodCountry,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating bacnk Account error", error);
    res.status(400).json(error);
  }
};

export const createPayment = async (req, res, next) => {
  const {
    amount,
    destinationToken,
    programToken,
    purpose,
    currency,
  } = req.body;
  try {
    let account = await hyperwallet.createPayment({
      amount,
      destinationToken,
      programToken,
      purpose,
      currency,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const createTransferMethod = async (req, res, next) => {
  const { userToken, jsonCacheToken, transferMethodConfiguration } = req.body;
  try {
    let account = await hyperwallet.createTransferMethod({
      userToken,
      jsonCacheToken,
      transferMethodConfiguration,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const createUser = async (req, res, next) => {
  const { clientId, firstName, lastName, email } = req.body;
  try {
    let account = await hyperwallet.createUser({
      clientId,
      firstName,
      lastName,
      email,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};
export const getBankAccount = async (req, res, next) => {
  const { userToken, bankAccountToken } = req.body;
  try {
    let account = await hyperwallet.getBankAccount({
      userToken,
      bankAccountToken,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const getUser = async (req, res, next) => {
  const { userToken } = req.body;
  try {
    let account = await hyperwallet.getUser({
      userToken,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const listBalanceForUser = async (req, res, next) => {
  const { userToken } = req.body;
  try {
    let account = await hyperwallet.listBalanceForUser({
      userToken,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const listBankAccounts = async (req, res, next) => {
  const { userToken } = req.body;
  try {
    let account = await hyperwallet.listBankAccounts({
      userToken,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const transferToBank = async (req, res, next) => {
  const { transferMethodToken, amount, userToken } = req.body;
  try {
    let account = await hyperwallet.transferToBank({
      transferMethodToken,
      amount,
      userToken,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const updateUser = async (req, res, next) => {
  const {
    userToken,
    address_line1,
    address_line2,
    postal_code,
    city,
  } = req.body;
  try {
    let account = await hyperwallet.updateUser({
      userToken,
      address_line1,
      address_line2,
      postal_code,
      city,
    });
    if (account.status === "fail") {
      throw account;
    } else res.status(200).json(account);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};
