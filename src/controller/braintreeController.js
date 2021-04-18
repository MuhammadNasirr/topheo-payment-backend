import * as braintree from "../utils/braintree";
import { getUserById, Users } from "../utils/firebase";

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
    const { amount, paymentNonce } = req.body;
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
    res.status(200).json({
      status: "success",
      message: "Payment Processed successfully",
    });
  } catch (error) {
    console.log("paymentNonce Error::::", error);
    res.status(400).json(error);
  }
};
