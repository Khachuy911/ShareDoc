const users = require("../Models/userModel");
const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("../Middleware/asyncHandle");
const jwt = require("jsonwebtoken");
const sendMail = require("../Common/mailer");


module.exports = {
    getSignup:asyncHandle(async(req, res, next)=>{
        res.render("../Views/signup.ejs");
    }),
    signup: asyncHandle(async(req, res, next)=>{
        const user = await users.create(req.body);
        const token = user.signToken();
        //const refreshToken = await user.signRefreshToken();
        // res.status(200).json({
        //     status:"success",
        //     token,
        //     refreshToken
        // })
        // res.setHeader("Authorization", token)
        res.cookie("Authorization", token);
        res.redirect(`/`);
    }), 
    getLogin:asyncHandle(async(req, res, next)=>{
        let count ={err:0};
        res.render("../Views/login.ejs", {count});
    }),
    login: asyncHandle(async(req, res, next)=>{
        const data= req.body;   
        if(!data) return next(new errorRespose(401, "email or password empty"));     
        const user = await users.findOne({ email : data.email}).select('+password');
        if(!user || !(await user.matchPassword(data.password, user.password)))
        {
            let count= {err:1}
            return res.render("../Views/login.ejs", {count});  
        }
        // return next(new errorRespose(400, "email or password not correct"));
        const token = user.signToken();
        //const refreshToken = await user.signRefreshToken();
        // res.status(200).json({
        //     status:"success",
        //     token,
        //     refreshToken
        // })         
        res.setHeader("Authorization", token)
        res.cookie("Authorization", token);
        res.redirect(`/`);
    }),
    logout: asyncHandle(async(req, res, next)=>{
        res.clearCookie("Authorization");
        res.redirect(process.env.API + "/auth/login");
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
    getForgotPw: asyncHandle( async(req, res, next)=>{
        const count = {err :0};
        res.render("../Views/forgotPw.ejs", {count});
    }),
    forgotPw: asyncHandle( async(req, res, next)=>{
        const {email} = req.body;
        const count = {err :1};
        const user = await users.findOne({email},{count});
        // if(!user) return next(new errorRespose(400, "user invalid"));
        if(!user) return res.render("../Views/forgotPw.ejs", {count})
        const reset = await user.signResetToken();
        const link = `${req.protocol}://${req.get("host")}/api/v1/auth/reset/${reset}`;
        res.redirect("https://mail.google.com/mail/u/0/#inbox")
        const option = {
            email: email,
            link: link
        }
        sendMail(option);
        
        // res.status(200).json({
        //     status:"success",
            // message: `Check your email: ${email}`,
            // data: link
        // })
    }),
    getResetPw: asyncHandle(async(req, res, next)=>{
        res.render("../Views/resetPw.ejs");
    }),
    resetPW: asyncHandle(async(req, res, next)=>{
        const {token} = req.params;
        const {password, confirmPw} = req.body;
        if(!token) return next(new errorRespose(401, "token invalid"));
        const encode = await jwt.verify(token, process.env.JWT_RESET);
        const user = await users.findById(encode.id);
        if(!user) return next(new errorRespose(400, "user invalid"));
        user.password = password;
        user.confirmPw = confirmPw;
        await user.save();
        let count ={err:0};
        res.render("../Views/login.ejs", {count});
        // res.status(200).json({
        //     status:"success",
        //     message: "Reset password successfully"
        // })
    }),
}