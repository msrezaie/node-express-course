const { products } = require("../data");

// controller for GET method of products
const getProduct = (req, res) => {
  res.json(products);
};

// controller for GET method of products with specific ID
const getProductByID = (req, res) => {
  const prodID = parseInt(req.params.productID);
  const result = products.find((product) => product.id === prodID);
  result
    ? res.json(result)
    : res
        .status(404)
        .json({ success: false, message: "Product with given ID not found" });
};

// controller for GET method of searching a specific product with name or price
// And pagination with the use of query string parameters
const getSearchProduct = (req, res) => {
  let { search, limit, price } = req.query;
  let result = [...products];
  // example: /api/v1/products/query?search=al
  if (search) {
    // example: /api/v1/products/query?search=/sec/
    if (search.startsWith("/")) {
      // the returned query string is in string format, it is converted to a regex object and trailing slashes are removed
      search = new RegExp(search.slice(1, -1));
      result = result.filter((product) => search.test(product.name));
    } else {
      result = result.filter((product) => product.name.startsWith(search));
    }
  }
  // example: /api/v1/products/query?price=gt:10
  if (price) {
    price = price.split(":");
    if (price[0] === "gt") {
      result = result.filter((product) => product.price > price[1]);
    } else if (price[0] === "lt") {
      result = result.filter((product) => product.price < price[1]);
    }
  }
  // example: /api/v1/products/query?limit=3
  if (limit) {
    result = result.slice(0, Number(limit));
  }
  res.json(result);
};

module.exports = { getProduct, getProductByID, getSearchProduct };
