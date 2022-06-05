const express = require("express");
const router = express.Router();

const {
  createCart,
  addProductToCart,
  removeProductFromCart,
  getSingleCart,
  payCart,
  deleteCart,
  getAll,
  getAllOwn,
} = require("../controllers/cart.controller");
const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
router.post("/:productId", authenticationMiddleware, createCart);
router.put("/add-product-cart", authenticationMiddleware, addProductToCart);
router.delete(
  "/remove-product-cart/:cartId",
  authenticationMiddleware,
  removeProductFromCart
);
router.delete("/:cartId", deleteCart);
router.get("/single-cart", authenticationMiddleware, getSingleCart);
router.get("/", authenticationMiddleware, isAdmin, getAll);
router.get("/me", authenticationMiddleware, getAllOwn);
router.put("/payment/:cartId", authenticationMiddleware, payCart);
module.exports = router;
