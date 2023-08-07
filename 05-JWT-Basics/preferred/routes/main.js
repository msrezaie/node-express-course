const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const { login, hello } = require("../controllers/main");

router.route("/login").post(login);
router.route("/hello").get(authenticate, hello);

module.exports = router;
