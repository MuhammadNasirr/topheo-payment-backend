import { Router } from "express";

const errorRoutes = Router();
errorRoutes.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
errorRoutes.get("*", (req, res, next) => {
  res.status(404).json({ message: "Route does not exist" });
});

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
export { errorRoutes, errorHandler };
