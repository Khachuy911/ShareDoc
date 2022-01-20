const users = require("../Models/userModel");
const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("../Middleware/asyncHandle");
const document = require("../Models/documentModel");
const documentDetail = require("../Models/documentDetailModel");
const exam = require("../Models/examModel");
const examDetail = require("../Models/examDetailModel");
const project = require("../Models/projectModel");
const projectDetail = require("../Models/projectDetailModel")

module.exports = {
    edit:asyncHandle(async(req, res, next)=>{
        if(!req.file) return next(new errorRespose(400, "you need update avatar"))
        const {path} = req.file;
        const newPath = path.split("\\");
        newPath.shift();
        req.body.avatar = newPath.join("/");
        const user = await users.findByIdAndUpdate(req.user.id ,req.body);
        // res.status(201).json({
        //     status:"success",
        //     data: "update user success"
        // })
        res.redirect("back");
    }),
    getMe: asyncHandle(async(req, res, next)=>{
        const {id} = req.user;
        const user = await users.findById(id);
        if(!user) return next(new errorRespose(400, "user invalid"));
        res.render("../Views/getMe.ejs", {user})
        // res.status(200).json({
        //     status:"success",
        //     user
        // })
    }),
    getAllUser:asyncHandle(async(req, res, next)=>{
        const data = await users.find();
        if(!data) return next(new(400, "user empty"));
        res.render("../Views/Admin/admin.ejs", {data})
    }),
    delete:asyncHandle(async(req, res, next)=>{
        const id =req.params.id;
        const data = await users.findByIdAndDelete(id);
        const docs = await document.find({user: data.id})
        docs.forEach(async ele => {
            console.log(ele._id);  
            await document.findByIdAndDelete(ele._id);
            await documentDetail.deleteMany({doc: ele._id});          
        });
        const exs = await exam.find({user: data.id})
        exs.forEach(async ele => {
            console.log(ele._id);  
            await exam.findByIdAndDelete(ele._id);
            await examDetail.deleteMany({doc: ele._id});          
        });
        const pros = await project.find({user: data.id})
        pros.forEach(async ele => {
            console.log(ele._id);  
            await project.findByIdAndDelete(ele._id);
            await projectDetail.deleteMany({doc: ele._id});          
        });
        
        res.redirect("back");
    })
}