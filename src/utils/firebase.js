var admin = require("firebase-admin");
const credentials = require("../../firebase.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(credentials),

  databaseURL: "https://images-slider.firebaseio.com",
});

export const db = admin.database();
export const Users = db.ref("Users");
export const Orders = db.ref("Orders");

// Attach an asynchronous callback to read the data at our posts reference
export const getUserById = (id) => {
  return new Promise((res, rej) => {
    Users.orderByKey()
      .equalTo(id)
      .on(
        "value",
        function (snapshot) {
          let data = snapshot.toJSON();
          if (data) {
            data = data[id];
          } else {
            rej({ status: "fail", message: "User doesnot exist in Database" });
          }
          res(data);
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          rej({ status: "fail", message: "Something went wrong" });
        }
      );
  });
};

export const getOrderById = (id) => {
  return new Promise((res, rej) => {
    Orders.orderByKey()
      .equalTo(id)
      .on(
        "value",
        function (snapshot) {
          let data = snapshot.toJSON();
          if (data) {
            data = data[id];
          } else {
            rej({ status: "fail", message: "Order doesnot exist in Database" });
          }
          res(data);
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          rej({ status: "fail", message: "Something went wrong" });
        }
      );
  });
};
