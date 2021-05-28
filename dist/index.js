"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _PublicRoutes = require("./routing/PublicRoutes");

var _ErrorHandler = require("./middlewares/ErrorHandler");

var _ProtectedRoutes = require("./routing/ProtectedRoutes");

var methodOverride = require("method-override"); // let spawn = require("child_process").spawn;
// let backupProcess = spawn("mongodump", [
//   '--uri="mongodb+srv://test:test1234@cluster0.13uvc.mongodb.net/server?retryWrites=true&w=majority"',
//   "--archive=.",
//   "--gzip",
// ]);
// backupProcess.on("exit", (code, signal) => {
//   if (code) console.log("Backup process exited with code ", code);
//   else if (signal)
//     console.error("Backup process was killed with singal ", signal);
//   else console.log("Successfully backedup the database");
// });


var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.set("trust proxy", true);
app.use(_bodyParser["default"].json());
var baseUrl = process.env.BASE_URL || "/";
app.use(_PublicRoutes.publicRouter);
app.use(_ProtectedRoutes.protectedRouter);
app.all("*", function (req, res, next) {
  var err = new Error("Can't find ".concat(req.originalUrl, " on this server!"));
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});
app.use(_ErrorHandler.errorHandler);
app.listen(process.env.PORT || 3000, function () {
  console.log("Authentication service started on port 3000");
});