const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const adminRoleMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication ",
      });
    }
    const payload = user;
    if (payload.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication admin",
      });
    }
  });
};

const userRoleMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication",
      });
    }
    const payload = user;
    if (payload.isAdmin || payload?.id === req.params.id) {
      next();
    } else {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication user",
      });
    }
  });
};

module.exports = { adminRoleMiddleware, userRoleMiddleware };
