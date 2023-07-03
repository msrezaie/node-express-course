const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found!");
});

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
