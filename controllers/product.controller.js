const sendResponse = require("../helpers/sendResponse");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

const productController = {};

productController.createProduct = async (req, res, next) => {
  const { name } = req.body;
  let { price, stock } = req.body;
  let result;
  try {
    if (!name || !price || !stock) {
      throw new Error("missing info");
    }
    price = parseInt(price);
    stock = parseInt(stock);
    if (
      typeof price !== Number ||
      price < 0 ||
      typeof stock !== Number ||
      stock < 0
    ) {
      throw new Error("price or stock invalid");
    }
    const newProduct = {
      name,
      price,
      stock,
    };
    console.log("this is new product created", newProduct);
    result = await Product.create(newProduct);
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "successfully create a new product"
  );
};

productController.getAllProduct = async () => {};
productController.updateProduct = async () => {};
productController.getSingleProduct = async () => {};
productController.deleteProduct = async () => {};
productController.rateProduct = async () => {};

module.exports = productController;
