const Cart = require("../models/Cart");
const Product = require("../models/Product");
const sendResponse = require("../helpers/sendResponse");
const User = require("../models/User");

const cartController = {};
cartController.createCart = async (req, res, next) => {
  let result;
  try {
    const owner = req.currentUser._id;
    const { productId } = req.params;
    let { qty } = req.body;
    qty = parseInt(qty);
    if (!productId || typeof qty !== "number") {
      throw new Error("missing info");
    }
    if (qty < 0) {
      throw new Error("qty is invalid");
    }
    const activeCart = await Cart.findOne({ owner, status: "active" });
    console.log("activeCart", activeCart);
    if (activeCart) throw new Error("this user already has an active cart");
    const found = await Product.findById(productId);
    if (!found) throw new Error("this product can not be found");
    const productChoice = { productId, qty };
    const newCart = { owner, products: [productChoice] };
    result = await Cart.create(newCart);
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    { result },
    false,
    "Successfully create a shopping cart"
  );
};

cartController.addProductToCart = async (req, res, next) => {
  const owner = req.currentUser._id;
  const body = req.body;
  let result;
  try {
    const cartToUpdate = await Cart.findOne({ owner, status: "active" });
    body.map((product) => {
      const qty = parseInt(product.qty);
      const productId = product.productId;
      cartToUpdate.products.push({ productId, qty });
    });
    result = await Product.findByIdAndUpdate(cartToUpdate._id, cartToUpdate, {
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
    "Successfully add product to this cart"
  );
};

cartController.removeProductFromCart = async (req, res, next) => {
  let result;
  const { cartId } = req.params;
  let { productId, qty } = req.body;
  try {
    const cartFound = await Cart.findById(cartId);
    const newProductsList = cartFound.products.filter((existed) => {
      if (existed.productId.equals(productId)) {
        existed.qty -= qty;
      }
      return existed.qty > 0;
    });
    cartFound.products = newProductsList;
    result = await Cart.findByIdAndUpdate(cartId, cartFound, { new: true });
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    `Successfully remove ${qty} product from cart`
  );
};

cartController.getSingleCart = async (req, res, next) => {
  let result;
  const { cartId } = req.query;
  const owner = req.currentUser._id;
  try {
    console.log(owner, cartId);
    result = await Cart.findOne({ owner, _id: cartId }).populate(
      "products.productId"
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
    "Successfully get single shopping cart"
  );
};
cartController.payCart = async (req, res, next) => {
  let result = {};
  const { cartId } = req.params;
  const { currentBalance, _id } = req.curentUser;
  try {
    let found = await Cart.findById(cartId).populate("products.productId");
    const productsToUpdate = await Promise.all(
      found.products.map(async (request) => {
        const existed = await Product.findById(request.productId._id);
        let newStock = existed.stock;
        if (request.qty <= existed.stock) {
          newStock = existed.stock - request.qty;
        } else {
          console.log(
            "Sole out",
            request.productId.name,
            request.qty,
            existed.stock
          );
          throw new Error("Sold out product");
        }
        return { _id: existed._id, newStock };
      })
    );
    const total = found.products.reduce(
      (acc, cur) => acc + cur.qty * cur.productId.price,
      0
    );
    if (found.status === "paid") throw new Error("cart already paid");
    if (total > currentBalance)
      throw new Error("404 - You dont have enough money");
    const newBalance = currentBalance - total;
    result.cart = await Cart.findByIdAndUpdate(
      cartId,
      { status: "paid" },
      { new: true }
    );
    const user = await User.findByIdAndUpdate(
      _id,
      { currentBalance: newBalance },
      { new: true }
    );
    result.currentBalance = user.currentBalance;
    await Promise.all(
      productsToUpdate.map(async (product) => {
        await Product.findByIdAndUpdate(product._id, {
          stock: product.newStock,
        });
      })
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
    "Successfully pay for your shopping cart"
  );
};
cartController.deleteCart = async (req, res, next) => {
  let result;
  const { cartId } = req.params;
  const owner = req.currentUser._id;
  try {
    result = await Cart.findOneAndUpdate(
      { _id: cartId, owner },
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
    "Successfully delete this shopping cart"
  );
};
cartController.getAll = async (req, res, next) => {
  let result = {};
  try {
    result.carts = await Cart.find({}).populate([
      "owner",
      "products.productId",
    ]);
    result.count = result.carts.length;
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully get all carts of users"
  );
};
cartController.getAllOwn = async (req, res, next) => {
  let result = {};
  let owner = req.currentUser._id;
  try {
    result.carts = await Cart.find({ owner }).populate("products.productId");
    result.count = result.carts.length;
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully get all my carts"
  );
};
module.exports = cartController;
