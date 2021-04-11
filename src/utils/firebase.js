var admin = require("firebase-admin");
const credentials = require("../firebase.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
