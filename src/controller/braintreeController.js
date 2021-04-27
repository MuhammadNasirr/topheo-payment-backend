import { ADMIN_FEE } from "../constants";
import { env } from "../env";
import * as braintree from "../utils/braintree";
import { getUserById, Users, Orders } from "../utils/firebase";
import * as hyperwallet from "../utils/hyperwallet";

export const initializePaymentProcess = async (req, res, next) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      throw {
        status: "fail",
        message: "No CustomerID provided",
      };
    }
    let customer = await braintree.findCustomer(customerId);

    if (!customer) {
      let user = await getUserById(customerId);
      customer = await braintree.createCustomer({
        id: customerId,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      });
    }
    let token = await braintree.generateToken(customerId);
    console.log("InitPayProc:::", token);
    res.status(200).json({
      status: "success",
      clientToken: token.clientToken,
    });
  } catch (error) {
    console.log("InitPayProc Error::::", error);
    res.status(400).json(error);
  }
};

export const createBankAccount = async (req, res, next) => {
  try {
    const {
      userId,
      bankAccountId,
      bankAccountPurpose,
      branchId,
      transferMethodCurrency,
      transferMethodCountry,
      postalCode,
      stateProvince,
      address,
      city,
      profileType,
      country,
    } = req.body;

    if (!userId) {
      throw { status: "fail", message: "User ID missing" };
    }
    let user = await getUserById(userId);
    console.log(user);
    let customer = await braintree.createCustomer({
      id: userId,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
    });
    if (!user.hyperwalletToken) {
      let hyperwalletUser = await hyperwallet.createUser({
        clientId: userId,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
      });
      user.hyperwalletToken = hyperwalletUser.token;
    }
    if (!user.hyperwalletBankToken) {
      let bankToken = await hyperwallet.createBankAccount({
        userToken: user.hyperwalletToken,
        bankAccountId,
        bankAccountPurpose,
        branchId,
        transferMethodCurrency,
        transferMethodCountry,
        postalCode,
        stateProvince,
        addressLine1: address,
        city,
        profileType,
        country,
        lastName: user.lastname,
        firstName: user.firstname,
      });
      user.hyperwalletBankToken = bankToken.token;
    }
    let up = Users.child(userId);
    await up.update({
      hyperwalletToken: user.hyperwalletToken,
      hyperwalletBankToken: user.hyperwalletBankToken,
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log("paymentNonce Error::::", error);
    res.status(400).json(error);
  }
};

export const getAuthToken = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw { status: "fail", message: "User ID missing" };
    }
    let user = await getUserById(userId);
    if (!user.hyperwalletToken) {
      throw {
        status: "fail",
        message: "User Account does not Exist",
      };
    }
    let token = await hyperwallet.getUserJwt(user.hyperwalletToken);
    console.log(token, user.hyperwalletToken);
    res.status(200).json({ status: "success", token: token.data.value });
  } catch (error) {
    console.log("paymentNonce Error::::", error);
    res.status(400).json(error);
  }
};

export const getBankAccount = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw { status: "fail", message: "User ID missing" };
    }
    let user = await getUserById(userId);
    console.log(user);
    if (!user.hyperwalletToken || !user.hyperwalletBankToken) {
      throw {
        status: "fail",
        message: "User or User Bank Account does not Exist",
      };
    }
    let bank = await hyperwallet.listBankAccounts({
      userToken: user.hyperwalletToken,
    });

    res.status(200).json({
      status: "success",
      bank,
    });
  } catch (error) {
    console.log("paymentNonce Error::::", error);
    res.status(400).json(error);
  }
};

export const getUserBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw { status: "fail", message: "User ID missing" };
    }
    let user = await getUserById(userId);
    if (!user.hyperwalletToken) {
      throw {
        status: "fail",
        message: "User Account does not exist",
      };
    }
    let balance = (
      await hyperwallet.listBalanceForUser({
        userToken: user.hyperwalletToken,
      })
    ).data.data;
    console.log(balance);
    res.status(200).json({ status: "success", balance });
  } catch (error) {
    console.log("Balance Error::::", error);
    res.status(400).json(error);
  }
};

export const transferToBank = async (req, res, next) => {
  try {
    const { userId, bankToken, amount } = req.body;
    if (!userId) {
      throw { status: "fail", message: "User ID missing" };
    }
    let user = await getUserById(userId);
    if (!user.hyperwalletToken || !user.hyperwalletBankToken) {
      throw {
        status: "fail",
        message: "User or User Bank Account does not Exist",
      };
    }
    // let balance = (
    //   await hyperwallet.listBalanceForUser({
    //     userToken: user.hyperwalletToken,
    //   })
    // ).data.data;
    // console.log(balance);
    // for (let i = 0; i < balance.length; i++) {
    let transfer = await hyperwallet.transferToBank({
      userToken: user.hyperwalletToken,
      amount: amount,
      transferMethodToken: bankToken,
    });

    let up = Users.child(userId);
    let bal = (await hyperwallet.listBalanceForUser(user.hyperwalletToken)).data
      .data;
    await up.update({
      amountInHyperwallet: bal.length ? bal[0].amount : 0,
    });
    // }
    res.status(200).json({
      status: "success",
      message: "Amount succesfully transfered to Bank",
    });
  } catch (error) {
    console.log("Transfer Error::::", error);
    res.status(400).json(error);
  }
};

export const processPaymentNonce = async (req, res, next) => {
  try {
    const { amount, paymentNonce, riderId, currency, orderId } = req.body;
    if (!amount || !paymentNonce) {
      throw {
        status: "fail",
        message: "Amount or Payment Nonce not Provided",
      };
    }
    let rider = await getUserById(riderId);
    // console.log(user);
    let customer = await braintree.findCustomer(riderId);
    if (!customer)
      await braintree.createCustomer({
        id: riderId,
        firstName: rider.firstname,
        lastName: rider.lastname,
        email: rider.email,
      });
    if (!rider.hyperwalletToken) {
      let hyperwalletUser = await hyperwallet.createUser({
        clientId: riderId,
        email: rider.email,
        firstName: rider.firstname,
        lastName: rider.lastname,
      });
      rider.hyperwalletToken = hyperwalletUser.token;
      console.log(hyperwalletUser);
      let up = Users.child(riderId);
      await up.update({
        hyperwalletToken: rider.hyperwalletToken,
      });
    }
    let response = await braintree.pay({ amount, paymentNonce });

    console.log("ProcPayNonce:::", response);
    if (!response.success) {
      throw {
        status: "fail",
        message: response.message,
      };
    }

    const amountToTransfer = parseFloat(amount) * ((100 - ADMIN_FEE) / 100);

    console.log("HYPPERWALLET_PAYMENT", rider);
    const payload = {
      amount: amountToTransfer,
      destinationToken: rider.hyperwalletToken,
      currency: currency,
      programToken: env.hyperwallet.programToken,
      purpose: "GP0005",
    };
    console.log("HYPERWALLET_PAYLOAD", payload);
    await hyperwallet.createPayment(payload);
    let up = Orders.child(orderId);
    await up.update({
      status: "COMPLETED",
    });
    up = Users.child(riderId);
    let bal = (await hyperwallet.listBalanceForUser(rider.hyperwalletToken))
      .data.data;

    await up.update({
      currency: currency,
      amountInHyperwallet: bal.length ? bal[0].amount : 0,
    });
    res.status(200).json({
      status: "success",
      message: "Payment Processed successfully",
    });
  } catch (error) {
    console.log("paymentNonce Error::::", error);
    res.status(400).json(error);
  }
};
