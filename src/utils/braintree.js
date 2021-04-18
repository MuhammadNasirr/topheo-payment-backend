import braintree from "braintree";
import { env } from "../env";

export const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: env.braintree.merchantId,
  publicKey: env.braintree.publicKey,
  privateKey: env.braintree.privateKey,
});

export const createCustomer = async ({ id, firstName, lastName, email }) => {
  return await gateway.customer.create({
    id,
    firstName,
    lastName,
    email,
  });
};

export const findCustomer = async (id) => {
  try {
    const customer = await gateway.customer.find(id);
    console.log("braintree: Find Customer:::", customer);

    return customer;
  } catch (error) {
    console.log("braintree: Find Customer Err:::", error);
    return null;
  }
};
// gateway.customer.delete("j785mJAZowR1OD0UOrWFzEn1KGv1");
export const generateToken = async (customerId) => {
  return await gateway.clientToken.generate({
    customerId,
  });
};

export const pay = async ({ amount, paymentNonce }) => {
  return await gateway.transaction.sale({
    amount,
    paymentMethodNonce: paymentNonce,
    options: {
      submitForSettlement: true,
    },
  });
};
