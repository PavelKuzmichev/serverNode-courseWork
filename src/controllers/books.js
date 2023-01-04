const Book = require("../models/book");
const DefaultError = require("../middlewares/defaultError");

// Получаем все книги из БД
const getBooks = (req, res) => {
  return Book.find({})
    .orFail(new DefaultError(500, "Что-то пошло не так."))
    .then((books) => res.status(200).send(books));
};

// Получим книгу по ID
const getBook = (req, res) => {
  const { id } = req.params;
  return Book.findById(id)
    .orFail(new DefaultError(404, "Данная книга не найдена"))
    .then((book) => {
      res.status(200).send(book);
    });
};

// Создаем книгу
const createBook = (req, res) => {
  req.body = {
    title: "Garry Potter",
    author: "J. K. Rowling",
    year: 1997,
  };
  return Book.create({ ...req.body }).then((book) => {
    res.status(201).send(book);
  });
};

// Обновляем книгу
const updateBook = (req, res, next) => {
  const { id } = req.params;
  req.body = {
    title: "Saga o wiedźminie",
    author: "Andrzej Sapkowski",
    year: 1986,
  };
  Book.findByIdAndUpdate(id, { ...req.body })
    .orFail(new DefaultError(404, "Данная книга не найдена"))
    .then((book) => {
      res.status(200).send(res);
    })
    .catch((e) => {
      res.status(500);
    });
};
// Удалаем книгу
const deleteBook = (req, res, next) => {
  const { id } = req.params;
  Book.deleteOne({ _id: id })
    .orFail(new DefaultError(404, "Данная книга не найдена"))
    .then((dbResponse) => {
      res.status(200).send(dbResponse);
    })
    .catch((e) => {
      res.status(500);
    });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
