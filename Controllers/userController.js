const users = require("../Models/userModel");
const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("../Middleware/asyncHandle");

module.exports = {
    edit:asyncHandle(async(req, res, next)=>{
        if(!req.file) return next(new errorRespose(400, "you need update avatar"))
        const {path} = req.file;
        const newPath = path.split("\\");
        req.body.avatar = newPath.join("/");
        const user = await users.findByIdAndUpdate(req.user.id ,req.body);
        res.status(201).json({
            status:"success",
            data: "update user success"
        })
    }),
    getMe: asyncHandle(async(req, res, next)=>{
        const {id} = req.user;
        const user = await users.findById(id);
        if(!user) return next(new errorRespose(400, "user invalid"));
        res.status(200).json({
            status:"success",
            user
        })
    }),
}