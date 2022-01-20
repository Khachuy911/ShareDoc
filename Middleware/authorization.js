const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("../Middleware/asyncHandle");
module.exports = (...role)=>{
    return (req, res, next)=>{
        if(!role.includes(req.user.role)) return next(new errorRespose(401, "Bạn không được cấp phép quyền tại đây"));
        next();
    }
}
