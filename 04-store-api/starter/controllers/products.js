const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorsMap = {
      "<": "$lt",
      ">": "$gt",
      "<=": "$lte",
      ">=": "$gte",
      "=": "$eq",
    };
    const regex = /\b(<|>|=|<=|>=)\b/g;

    let numericFiltersFiltered = numericFilters.replace(
      regex,
      (match) => `-${operatorsMap[match]}-`
    );
    const validOptions = ["price", "rating"];
    numericFiltersFiltered = numericFiltersFiltered
      .split(",")
      .forEach((element) => {
        const [field, operator, value] = element.split("-");
        if (validOptions.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
  }

  let result = Product.find(queryObject);

  if (sort) {
    // for console log purposes
    queryObject.sort = sort;

    result = result.sort(sort.split(",").join(" "));
  } else {
    queryObject.sort = "createdAt";
    result = result.sort("createdAt");
  }

  if (fields) {
    // for console log purposes
    queryObject.fields = fields;

    result = result.select(fields.split(",").join(" "));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // for console log purposes
  queryObject.page = page;
  queryObject.limit = limit;
  queryObject.skip = skip;

  result = result.skip(skip).limit(limit);

  const products = await result;

  console.log("query params:", queryObject);

  res.status(200).json({ results: products.length, products });
};

module.exports = { getAllProducts };
