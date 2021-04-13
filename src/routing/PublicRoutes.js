import { Router } from "express";
import { createOtp, verifyOtp } from "../controller/authController";
import { sendSms } from "../controller/smsController";

let publicRouter = Router();
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

publicRouter.post("/sms/send", sendSms);
publicRouter.post("/auth/sendOtp", createOtp);
publicRouter.post("/auth/verifyOtp", verifyOtp);
// define the about route

export { publicRouter };
