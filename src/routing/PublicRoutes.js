import { Router } from "express";
import { sendSms } from "../controller/smsController";

let publicRouter = Router();
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

publicRouter.post("/sms/send", sendSms);
// define the about route

export { publicRouter };
