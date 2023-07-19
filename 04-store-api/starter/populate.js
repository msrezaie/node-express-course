require("dotenv").config();
const { connectDB } = require("./db/connect");
const productsInJson = require("./products.json");
const Product = require("./models/product");

const storeProductsToDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    console.log("products deleted successfully!");
    await Product.create(productsInJson);
    console.log("products added successfully!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

storeProductsToDB();
