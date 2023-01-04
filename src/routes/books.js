const booksRoutes = require("express").Router();

const {
  getBooks,
  deleteBook,
  getBook,
  updateBook,
  createBook,
} = require("../controllers/books");

booksRoutes.get("/", getBooks);
booksRoutes.post("/", createBook);
booksRoutes.get("/:id", getBook);
booksRoutes.patch("/:id", updateBook);
booksRoutes.delete("/:id", deleteBook);

module.exports = booksRoutes;
