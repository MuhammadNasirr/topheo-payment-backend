import { firebase } from "../utils/firebase";

function authMiddleware(request, response, next) {
  next();
  // const headerToken = request.headers.authorization;
  // if (!headerToken) {
  //   return response.status(401).send({ message: "No token provided" });
  // }

  // if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
  //   response.status(401).send({ message: "Invalid token" }).status(401);
  // }

  // const token = headerToken.split(" ")[1];
  // firebase
  //   .auth()
  //   .verifyIdToken(token)
  //   .then(() => next())
  //   .catch(() => response.status(403).send({ message: "Could not authorize" }));
}

export default authMiddleware;
