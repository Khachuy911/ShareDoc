const users = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("../Middleware/asyncHandle");

module.exports.protect = asyncHandle(async(req, res, next)=>{
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    if(!token) return next(new errorRespose(400, "You are not login"));
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findOne({id: decode.id});
    if(!user) return next(new errorRespose(400,"user invalid"));
    req.user = user;
    next();
})