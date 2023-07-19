require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const customErrorHandler = require("./middleware/error-handler");
const pageNotFound = require("./middleware/not-found");
const router = require("./routes/products");
const { connectDB } = require("./db/connect");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>welcome</h1>");
});

app.use("/api/v1/products", router);

app.use(customErrorHandler);
app.use(pageNotFound);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log("server running in port:", PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
