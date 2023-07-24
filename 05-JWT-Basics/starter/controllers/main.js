const { BadRequestError } = require("../errors/index");
const { UnauthorizedError } = require("../errors/index");

const jwt = require("jsonwebtoken");

const loginRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("bad request: no credentials");
  }

  const _id = new Date().getDate() + "" + Math.floor(Math.random() * 100);

  const token = jwt.sign({ _id, username }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authorizedUser = req.user;
  try {
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `hey ${authorizedUser.username}`,
      secret: `your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new UnauthorizedError("no valid token found");
  }
};

module.exports = {
  loginRegister,
  dashboard,
};
