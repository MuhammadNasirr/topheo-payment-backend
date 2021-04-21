import { isUuid } from "uuidv4";
import * as authRepo from "../repos/authRepo";
import * as braintree from "../utils/braintree";
import { getUserById } from "../utils/firebase";
import * as hyperwallet from "../utils/hyperwallet";

export const createOtp = async (req, res, next) => {
  try {
    const { uid, contact } = req.body;
    if (!uid) {
      throw {
        status: "fail",
        message: "UID not provided",
      };
    }
    if (!contact) {
      throw {
        status: "fail",
        message: "contact not provided",
      };
    }
    let db = await authRepo.sendOtp(uid, contact);
    res.status(200).json(db);
  } catch (error) {
    console.log("creating otp error", error);
    res.status(400).json(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { uid, otp } = req.body;
    if (!uid) {
      throw {
        status: "fail",
        message: "UID not provided",
      };
    }
    if (!otp) {
      throw {
        status: "fail",
        message: "otp not provided",
      };
    }
    let db = await authRepo.verifyOtp(uid, otp);

    let user = await getUserById(uid);
    // console.log(user);
    let customer = await braintree.findCustomer(uid);
    if (!customer)
      await braintree.createCustomer({
        id: uid,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      });
    if (!user.hyperwalletToken) {
      let hyperwalletUser = await hyperwallet.createUser({
        clientId: uid,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
      });
      user.hyperwalletToken = hyperwalletUser.token;
      console.log(hyperwalletUser);
      let up = Users.child(userId);
      await up.update({
        hyperwalletToken: user.hyperwalletToken,
      });
    }

    res.status(200).json(db);
  } catch (error) {
    console.log("verify otp error", error);
    res.status(400).json(error);
  }
};
