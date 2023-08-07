const express = require("express");
const router = express.Router();
const authorizeUser = require("../middleware/auth");

const { loginRegister, dashboard } = require("../controllers/main");

router.route("/signin").post(loginRegister);
router.route("/dashboard").get(authorizeUser, dashboard);

module.exports = router;
