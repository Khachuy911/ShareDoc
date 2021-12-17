const users = require("../Models/userModel");
const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("../Middleware/asyncHandle");
const jwt = require("jsonwebtoken");
const sendMail = require("../Common/mailer");

module.exports = {
    signup: asyncHandle(async(req, res, next)=>{
        const user = await users.create(req.body);
        const token = user.signToken();
        const refreshToken = await user.signRefreshToken();
        res.status(200).json({
            status:"success",
            token,
            refreshToken
        })
    }),
    login: asyncHandle(async(req, res, next)=>{
        const data= req.body;   
        if(!data) return next(new errorRespose(401, "email or password empty"));     
        const user = await users.findOne({ email : data.email}).select('+password');
        if(!user || !(await user.matchPassword(data.password, user.password)))
            return next(new errorRespose(400, "email or password not correct"));
        const token = user.signToken();
        const refreshToken = await user.signRefreshToken();
        res.status(200).json({
            status:"success",
            token,
            refreshToken
        })
    }),
    getMe: asyncHandle(async(req, res, next)=>{
        const id = req.user;
        const user = await users.findOne({id});
        if(!user) return next(new errorRespose(400, "user invalid"));
        res.status(200).json({
            status:"success",
            user
        })
    }),
    accessRefreshToken: asyncHandle(async(req, res, next)=>{
        const {refreshToken} = req.body;
        const decode = await jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await users.findOne({id: decode.id});
        if(!user) return next(new errorRespose(400, "user invalid"));
        const token = user.signToken();
        res.status(200).json({
            status:"success",
            token
        })
    }),
    forgotPw: asyncHandle( async(req, res, next)=>{
        const {email} = req.body;
        const user = await users.findOne({email});
        if(!user) return next(new errorRespose(400, "user invalid"));
        const reset = await user.signResetToken();
        const link = `${req.protocol}://${req.get("host")}/api/v1/auth/forgotPassword/${reset}`;
        // const option = {
        //     email: email,
        //     link: link
        // }
        // sendMail(option);
        res.status(200).json({
            status:"success",
            // message: `Check your email: ${email}`,
            data: link
        })
    })
}