require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const notFount = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const taskRoutes = require("./routes/tasks");

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

app.use(notFount);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running in port: " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
