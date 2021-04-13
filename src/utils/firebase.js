var admin = require("firebase-admin");
const credentials = require("../firebase.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(credentials),

  databaseURL: "https://images-slider.firebaseio.com",
});

export const db = admin.database();
export const Users = db.ref("Users");

// Attach an asynchronous callback to read the data at our posts reference
Users.orderByKey()
  .equalTo("V70jYeEbJlc1Q9fquUZjXeqpxeF2")
  .on(
    "value",
    function (snapshot) {
      console.log(snapshot.val());
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
