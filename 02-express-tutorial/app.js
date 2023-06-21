const express = require("express");
const { products } = require("./data");

const app = express();

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const prodID = parseInt(req.params.productID);
  const result = products.find((product) => product.id === prodID);
  result
    ? res.json(result)
    : res.status(404).json({ message: "That product was not found." });
});

app.get("/api/v1/query", (req, res) => {
  let { search, limit, price } = req.query;
  let result = [...products];
  // example: /api/v1/query?search=al
  if (search) {
    // example: /api/v1/query?search=/sec/
    if (search.startsWith("/")) {
      // the returned query string is in string format, it is converted to a regex object and trailing slashes are removed
      search = new RegExp(search.slice(1, -1));
      result = result.filter((product) => search.test(product.name));
    } else {
      result = result.filter((product) => product.name.startsWith(search));
    }
  }
  // example: /api/v1/query?price=gt:10
  if (price) {
    price = price.split(":");
    if (price[0] === "gt") {
      result = result.filter((product) => product.price > price[1]);
    } else if (price[0] === "lt") {
      result = result.filter((product) => product.price < price[1]);
    }
  }
  // example: /api/v1/query?limit=3
  if (limit) {
    result = result.slice(0, Number(limit));
  }
  res.json(result);
});

app.all("*", (req, res) => {
  res.status(404).send("404");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
