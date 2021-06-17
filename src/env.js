export const env = {
  twilio: {
    accountSid:
      process.env.TWILIO_ACCOUNT_SID || "AC723bcceee53baa619e6aaf2b2e95cbf6",
    //   process.env.TWILIO_ACCOUNT_SID || "AC7e39d8ebca24539674b1ad4a584044f1",
    authToken:
      //   process.env.TWILIO_AUTH_TOKEN || "d67cc196e6db69b95395cae42423c023",
      process.env.TWILIO_AUTH_TOKEN || "a62cb922a313d3500520bb99a01d6e50",
  },
  hyperwallet: {
    apiUrl:
      process.env.HYPERWALLET_API_URL || "https://api.sandbox.hyperwallet.com",
    programToken:
      process.env.HYPERWALLET_PROGRAM_TOKEN ||
      "prg-9c6e74c6-da17-47c5-b78b-13a6b21982c6",
    apiUsername: process.env.HYPERWALLET_API_USER || "restapiuser@22739611618",
    apiPassword: process.env.HYPERWALLET_API_PASSWORD || "2pAFkYTKLY@bV2s",
  },
  braintree: {
    merchantId: process.env.BRAINTREE_MERCHANT_ID || "q4k7xn3x7hhcj4kv",
    publicKey: process.env.BRAINTREE_PUB_KEY || "db4cn838644nqhnk",
    privateKey:
      process.env.BRAINTREE_PRIV_KEY || "ee5353e26f93aa1f66754666af75f5f9",
  },
};
