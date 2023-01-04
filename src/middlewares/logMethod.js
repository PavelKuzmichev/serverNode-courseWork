exports.logMethodMiddleware = (req, res, next) => {
  console.log(req.originalUrl);
  next();
};
