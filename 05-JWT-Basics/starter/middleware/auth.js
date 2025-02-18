const { UnauthorizedError } = require("../errors/index");
const jwt = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("no valid token found");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError("no valid token found");
  }
};

module.exports = authorizeUser;
