const isAdmin = (req, res, next) => {
  try {
    if (req.currentUser.role !== "admin")
      throw new Error("you need to be admin to change this");
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
