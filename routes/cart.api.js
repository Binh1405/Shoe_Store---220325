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
router.put(
  "/addProductCart/:productId",
  authenticationMiddleware,
  addProductToCart
);
router.delete(
  "/removeProductCart/:productId",
  authenticationMiddleware,
  removeProductFromCart
);
router.delete("/:cartId", authenticationMiddleware, deleteCart);
router.get("/", authenticationMiddleware, isAdmin, getAll);
router.get("/myCart", authenticationMiddleware, getAllOwn);
router.get("/:cartId", authenticationMiddleware, getSingleCart);
router.put("/payment/:cartId", authenticationMiddleware, payCart);
module.exports = router;
