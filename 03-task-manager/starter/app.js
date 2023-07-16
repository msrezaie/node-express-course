const express = require("express");
const app = express();
const mongoose = require("mongoose");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);
app.use(errorHandler);
app.use(notFound);

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
