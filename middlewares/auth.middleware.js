const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_MY_SECRET = process.env.JWT_MY_SECRET;

const authenticationMiddleware = async (req, res, next) => {
  try {
    console.log("req", req.body);
    const headerToken = req.headers.authorization;
    if (!headerToken) throw new Error("Missing accesstoken in request header");
    console.log("accessToken", headerToken);
    const token = headerToken.split(" ")[1];
    const decrypted = jwt.verify(token, JWT_MY_SECRET);
    console.log("decrypted", decrypted);
    const user = await User.findById(decrypted._id);
    req.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticationMiddleware;
