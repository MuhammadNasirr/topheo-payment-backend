import * as braintree from "../utils/braintree";

export const createCustomer = async (res, req, next) => {
  try {
    const { id, firstName, lastName, email } = req.body;
    let customer = await braintree.createCustomer({
      id,
      firstName,
      lastName,
      email,
    });
    req.status(200).json(customer);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const findCustomer = async (res, req, next) => {
  try {
    const { id } = req.body;
    let customer = await braintree.findCustomer(id);
    req.status(200).json(customer);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const generateToken = async (res, req, next) => {
  try {
    const { customerId } = req.body;
    let customer = await braintree.generateToken(customerId);
    req.status(200).json(customer);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};

export const pay = async (res, req, next) => {
  try {
    const { amount, paymentNonce } = req.body;
    let customer = await braintree.pay({ amount, paymentNonce });
    req.status(200).json(customer);
  } catch (error) {
    console.log("creating payment error", error);
    res.status(400).json(error);
  }
};
