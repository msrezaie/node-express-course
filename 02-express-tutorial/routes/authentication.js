const express = require("express");
const router = express.Router();

const {
  login,
  logoff,
  authenticate,
  testAuthentication,
} = require("../controllers/authentication");

// HTTP GET methods with url routes connected to their specific controllers, done through chaining
router.route("/test").get(authenticate, testAuthentication);
router.route("/login").get(login);
router.route("/logoff").get(logoff);

module.exports = router;
