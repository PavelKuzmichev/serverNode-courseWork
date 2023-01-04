const userRoutes = require("express").Router();
const {
  getUsers,
  deleteUser,
  getUser,
  updateUser,
  createUser,
} = require("../controllers/users");

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.get("/:id", getUser);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

module.exports = userRoutes;
