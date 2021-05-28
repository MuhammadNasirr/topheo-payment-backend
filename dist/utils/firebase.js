"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.Users = exports.db = exports.firebase = void 0;

var admin = require("firebase-admin");

var credentials = require("../../firebase.json");

var firebase = admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://images-slider.firebaseio.com"
});
exports.firebase = firebase;
var db = admin.database();
exports.db = db;
var Users = db.ref("Users"); // Attach an asynchronous callback to read the data at our posts reference

exports.Users = Users;

var getUserById = function getUserById(id) {
  return new Promise(function (res, rej) {
    Users.orderByKey().equalTo(id).on("value", function (snapshot) {
      var data = snapshot.toJSON();

      if (data) {
        data = data[id];
      } else {
        rej({
          status: "fail",
          message: "User doesnot exist in Database"
        });
      }

      res(data);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      rej({
        status: "fail",
        message: "Something went wrong"
      });
    });
  });
};

exports.getUserById = getUserById;