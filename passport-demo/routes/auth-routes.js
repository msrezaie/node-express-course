const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signUp, register, logout } = require("../controllers/auth-controller");

router.route("/sign-up").get(signUp).post(register);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);
router.get("/log-out", logout);

module.exports = router;
