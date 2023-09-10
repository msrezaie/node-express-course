const bcrypt = require("bcrypt");
const User = require("../models/User");

const signUp = (req, res) => {
  res.render("sign-up-form");
};

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.clearCookie("connect.sid");
      res.redirect("/");
    }
  });
};

module.exports = { signUp, register, logout };
