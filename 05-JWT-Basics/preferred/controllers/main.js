const { BadRequestError } = require("../errors/index");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequestError("bad request: no credentials");
  }

  const _id = new Date().getDate() + "" + Math.floor(Math.random() * 100);

  const token = jwt.sign({ _id, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.status(200).json({ token });
};

const hello = async (req, res) => {
  const authorizedUser = req.user;
  try {
    res.status(200).json({
      msg: `hey ${authorizedUser.name}, you succesfully made it to the login route!`,
    });
  } catch (error) {
    throw new UnauthorizedError("no valid token found");
  }
};

module.exports = {
  login,
  hello,
};
