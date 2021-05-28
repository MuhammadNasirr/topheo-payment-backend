"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = require("../utils/firebase");

function authMiddleware(request, response, next) {
  next(); //   const headerToken = request.headers.authorization;
  //   if (!headerToken) {
  //     return response.send({ message: "No token provided" }).status(401);
  //   }
  //   if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
  //     response.send({ message: "Invalid token" }).status(401);
  //   }
  //   const token = headerToken.split(" ")[1];
  //   //   firebase
  //   //     .auth()
  //   //     .verifyIdToken(token)
  //   //     .then(() => next())
  //   //     .catch(() => response.send({ message: "Could not authorize" }).status(403));
}

var _default = authMiddleware;
exports["default"] = _default;