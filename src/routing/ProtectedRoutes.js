import { Router } from "express";

let protectedRouter = Router();
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  // authMiddleware(req,res,next)
  // if()
  next();
});

export { protectedRouter };
