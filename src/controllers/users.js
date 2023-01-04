const User = require("../models/user");
const DefaultError = require("../middlewares/defaultError");

// Получаем всех пользователей из БД
const getUsers = (req, res) => {
  return User.find({})
    .orFail(new DefaultError(500, "Что-то пошло не так."))
    .then((users) => res.status(200).send(users));
};

// Получим пользователя по ID
const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
    .orFail(new DefaultError(404, "Данный пользователь не найден"))
    .then((user) => {
      res.status(200).send(user);
    });
};

// Создаем пользователя
const createUser = (req, res) => {
  req.body = {
    name: "Pavel",
    lastName: "Kuz",
    userName: "KuzPavel",
  };
  return User.create({ ...req.body }).then((user) => {
    res.status(201).send(user);
  });
};

// Обновляем пользователя
const updateUser = (req, res, next) => {
  const { id } = req.params;
  req.body = {
    name: "Pavel1",
    lastName: "Kuz1",
    userName: "Kuzpavel1",
  };
  User.findByIdAndUpdate(id, { ...req.body })
    .orFail(new DefaultError(404, "Данный пользователь не найден"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500);
    });
};
// Удалаем пользователя
const deleteUser = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .orFail(new DefaultError(404, "Данный пользователь не найден"))
    .then((dbResponse) => {
      res.status(200).send(dbResponse);
    })
    .catch((e) => {
      res.status(500);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
