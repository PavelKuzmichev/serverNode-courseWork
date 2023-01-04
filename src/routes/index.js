const express = require("express");
const DefaultError = require("../middlewares/defaultError");

const routes = express.Router();
const userRoutes = require("./users");
const booksRoutes = require("./books");

routes.use("/books", booksRoutes);
routes.use("/users", userRoutes);
routes.use("/", () => {
  throw new DefaultError(404, "Запрашиваемый ресурс не найден");
});
module.exports = routes;
