const express = require("express");

const router = express.Router();

const {
  getProduct,
  getProductByID,
  getSearchProduct,
} = require("../controllers/product");

// HTTP GET methods with url routes connected to their specific controllers
router.get("/api/v1/products", getProduct);
router.get("/api/v1/products/query", getSearchProduct);
router.get("/api/v1/products/:productID", getProductByID);

module.exports = router;
