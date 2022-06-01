const sendResponse = require("../helpers/sendResponse");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

const productController = {};

productController.createProduct = async (req, res, next) => {
  console.log("req", req);
  const { name } = req.body;
  let { price, stock } = req.body;
  console.log("new product", name, price, stock);
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

productController.getAllProduct = async (req, res, next) => {
  let { limit, page, ...filter } = req.query;
  limit = parseInt(req.query.limit) || 10;
  page = parseInt(req.query.page) || 1;
  let count = 0;
  let result;
  try {
    result = await Product.find({ ...filter, isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));
    count = result.length;
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    { result, count },
    false,
    "Successfully get all products"
  );
};
productController.updateProduct = async (req, res, next) => {
  let result;
  const allowOptions = ["name", "price", "stock"];
  const updateObject = {};
  const { productId } = req.params;
  try {
    allowOptions.forEach((option) => {
      if (req.body[option] !== undefined) {
        updateObject[option] = req.body[option];
      }
    });
    if (!productId) throw new Error("this product can not be found");
    result = await Product.findByIdAndUpdate(productId, updateObject, {
      new: true,
    });
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully update this product"
  );
};
productController.getSingleProduct = async (req, res, next) => {
  let result = {};
  let comments;
  const { productId } = req.params;
  try {
    if (!productId) throw new Error("this product is not found");
    result = await Product.findById(productId, { isDeleted: false });
    comments = await Comment.find({ targetProduct: productId }).populate(
      "author",
      "content"
    );
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully get this single product"
  );
};
productController.deleteProduct = async (req, res, next) => {
  let result;
  try {
    const { productId } = req.params;
    if (!productId) throw new Error("this product is not found");
    result = await Product.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true }
    );
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully delete this product"
  );
};
productController.rateProduct = async () => {};

module.exports = productController;
