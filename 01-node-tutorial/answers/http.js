const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("This is the home page");
  } else {
    res.end("4O4 not found!");
  }
});

server.listen(3000);
