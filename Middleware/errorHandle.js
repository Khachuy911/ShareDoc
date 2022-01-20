const errorResponse = require("../Helper/errorResponse");

function errorHandle(err, req, res, next){
  let error = { ...err };
  error.message = err.message || "Sai một thứ gì đó rồi 🤯";
  error.statusCode = err.statusCode || 500;
  if (err.name === "ValidationError") {
    //Nhập tên dưới 3 kí tự
    const message = Object.values(err.errors).map((messa) => messa.message);
    error = new errorResponse(400, message);
  }
  if (err.code === 11000) {
    // Bị trùng lặp
    // const message = "information already exists";
    const message = "Thông tin có thể đã bị tồn tại 🤯";
    error = new errorResponse(400, message);
  }
  if (err.name === "CastError") {
    // Nhập địa chỉ lung tung
    // const message = "not found link";
    const message = "Không tìm thấy địa chỉ 🤯";
    error = new errorResponse(404, message);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "jwt malformed";
    error = new errorResponse(401, message);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Mã đã hết hạn (15 phút) 🤯";
    error = new errorResponse(401, message);
  } 
  
  res.render("../Views/error.ejs", {error});
  // res.status(error.statusCode).json({
  //   err: 1,
  //   success: false,
  //   data: error.message,
  // });
}

module.exports = errorHandle;