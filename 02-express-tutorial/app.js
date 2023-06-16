const express = require("express");
const path = require("path");

const app = express();

// app.use(express.static("./public"));
// console.log(__dirname);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.all("*", (req, res) => {
  res.status(404).send("404");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
