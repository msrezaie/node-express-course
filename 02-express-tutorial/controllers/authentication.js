// Auth middleware to check and see if the user from the coming request is authenticated
const authenticate = (req, res, next) => {
  const { name } = req.cookies;
  if (!name) {
    res.status(401).json({ success: false, message: "User not authenticated" });
  } else {
    req.user = name;
    next();
  }
};

// Middleware handling user logging in by creating a cookie with a 'name' object
const login = (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({ success: false, message: "Please provide a name" });
  } else {
    res
      .cookie("name", name)
      .status(201)
      .json({ success: true, message: `Hello ${name}` });
  }
};

// Middleware for clearing the cookie
const logoff = (req, res, next) => {
  res
    .clearCookie("name")
    .status(200)
    .json({ success: true, message: "User logged off" });
};

// Middleware that will be invoked after the 'authenticate' middleware
const testAuthentication = (req, res, next) => {
  res.status(200).json({ success: true, message: `Welcome ${req.user}` });
};

module.exports = { login, logoff, authenticate, testAuthentication };
