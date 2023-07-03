const express = require("express");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/product");
const peopleRouter = require("./routes/people");
const authenticationRouter = require("./routes/authentication");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to apply cookie-parser
app.use(cookieParser());

// Middleware to server static files
app.use(express.static("./public"));

// Applying all my imported 'routers' to my main server with the help of express 'use' method
app.use(peopleRouter);
app.use(productRouter);
app.use(authenticationRouter);

// Middleware to handle all 404 routes
app.all("*", (req, res) => {
  res.status(404).send("404");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
