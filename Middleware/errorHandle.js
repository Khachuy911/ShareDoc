const errorResponse = require("../Helper/errorResponse");

function errorHandle(err, req, res, next){
  let error = { ...err };
  error.message = err.message || "wrong something";
  error.statusCode = err.statusCode || 500;
  if (err.name === "ValidationError") {
    //Nhập tên dưới 3 kí tự
    const message = Object.values(err.errors).map((messa) => messa.message);
    error = new errorResponse(400, message);
  }
  if (err.code === 11000) {
    // Bị trùng lặp
    const message = "information already exists";
    error = new errorResponse(400, message);
  }
  if (err.name === "CastError") {
    // Nhập địa chỉ lung tung
    const message = "not found link";
    error = new errorResponse(400, message);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "jwt malformed";
    error = new errorResponse(401, message);
  }
  if (err.name === "TokenExpiredError") {
    const message = "jwt expired";
    error = new errorResponse(401, message);
  } else {
  }
  res.status(error.statusCode).json({
    err: 1,
    success: false,
    data: error.message,
  });
}

module.exports = errorHandle;