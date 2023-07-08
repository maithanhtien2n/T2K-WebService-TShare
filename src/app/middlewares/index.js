const jwt = require("jsonwebtoken");
require("dotenv").config();
const { throwError } = require("../../utils/index");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (!token) {
      throwError(250, "Bạn cần mã token để call được api!");
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user_name) => {
      if (error) {
        throwError(251, "Mã token không chính xác!");
      }
      req.user_name = user_name;
      next();
    });
  } catch (error) {
    return res.json({
      success: false,
      statusCode: error.statusCode ? error.statusCode : 500,
      statusValue: error.statusValue
        ? error.statusValue
        : "Xác thực token thất bại!",
      data: null,
    });
  }
};

module.exports = {
  authenticateToken,
};
