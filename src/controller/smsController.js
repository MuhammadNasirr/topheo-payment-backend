import { twilioClient } from "../utils/twilio";

export const sendSms = async (req, res, next) => {
  try {
    let response = await twilioClient.messages.create({
      from: "++16672260821",
      to: req.body.to,
      body: req.body.body,
    });
    res.status(200).json({
      status: "success",
      message: "SMS succefully sent to " + req.body.to,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
