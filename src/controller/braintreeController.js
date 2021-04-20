import { ADMIN_FEE } from "../constants";
import { env } from "../env";
import * as braintree from "../utils/braintree";
import { getUserById, Users } from "../utils/firebase";
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

export const processPaymentNonce = async (req, res, next) => {
  try {
    const { amount, paymentNonce, riderId } = req.body;
    if (!amount || !paymentNonce) {
      throw {
        status: "fail",
        message: "Amount or Payment Nonce not Provided",
      };
    }
    let response = await braintree.pay({ amount, paymentNonce });

    console.log("ProcPayNonce:::", response);
    if (!response.success) {
      throw {
        status: "fail",
        message: response.message,
      };
    }
    let rider = await getUserById(riderId);
    if (!rider.hyperwalletToken) {
      let hyperwalletUser = await hyperwallet.createUser({
        clientId: riderId,
        email: rider.email,
        firstName: rider.firstname,
        lastName: rider.lastname,
      });
      let user = Users.child(riderId);
      await user.update({
        hyperwalletToken: "usr-024be52f-819d-458a-b0b2-e47543c5e997",
      });
      rider.hyperwalletToken = hyperwalletUser.token;
    }

    const amountToTransfer = parseFloat(amount) * ((100 - ADMIN_FEE) / 100);

    console.log("HYPPERWALLET_PAYMENT", rider);
    const payload = {
      amount: amountToTransfer,
      destinationToken: rider.hyperwalletToken,
      currency: "USD",
      programToken: env.hyperwallet.programToken,
      purpose: "GP0005",
    };
    console.log("HYPERWALLET_PAYLOAD", payload);
    await hyperwallet.createPayment(payload);
    res.status(200).json({
      status: "success",
      message: "Payment Processed successfully",
    });
  } catch (error) {
    console.log("paymentNonce Error::::", error);
    res.status(400).json(error);
  }
};
