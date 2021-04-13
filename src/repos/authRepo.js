import { Users } from "../utils/firebase";
import { twilioClient } from "../utils/twilio";

export const sendOtp = (uid, contact) => {
  return new Promise((resolve, reject) => {
    Users.orderByKey()
      .equalTo(uid)
      .once("value", async (data) => {
        // console.log("Users", data);
        try {
          let json = data.toJSON();
          if (json) {
            json = json[uid];
            let otp = Math.floor(100000 + Math.random() * 900000);

            let response = await twilioClient.messages.create({
              from: "+16505176163",
              to: contact,
              body: "Your OTP Code is " + otp,
            });
            let user = Users.child(uid);
            user.update({
              otp: otp,
            });
            resolve({
              status: "success",
              message: "OTP sent",
            });
          } else {
            throw "No User Found";
          }
        } catch (error) {
          reject({ status: "fail", message: error });
        }
      });
  });
};

export const verifyOtp = (uid, otp) => {
  return new Promise((resolve, reject) => {
    Users.orderByKey()
      .equalTo(uid)
      .once("value", async (data) => {
        try {
          let json = data.toJSON();
          if (json) {
            json = json[uid];
            console.log(json.otp, parseInt(otp));
            if (json.otp === parseInt(otp)) {
              let user = Users.child(uid);
              user.update({
                otp: null,
                isVerified: true,
              });
              resolve({
                status: "success",
                message: "OTP Verified",
              });
            } else {
              throw "Wrong OTP";
            }
          } else {
            throw "No User Found";
          }
        } catch (error) {
          reject({
            status: "fail",
            message: error.message ? error.message : error,
          });
        }
      });
  });
};
