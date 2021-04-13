import * as authRepo from "../repos/authRepo";

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
    res.status(200).json(db);
  } catch (error) {
    console.log("verify otp error", error);
    res.status(400).json(error);
  }
};
