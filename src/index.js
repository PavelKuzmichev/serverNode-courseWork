const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { logMethodMiddleware } = require("./middlewares/logMethod");

dotenv.config();
const { PORT = 3005, API_URL = "http://localhost" } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/library", async (err) => {
  if (err) throw err;
  console.log("connected to db");
});
app.use("/", logMethodMiddleware);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});
