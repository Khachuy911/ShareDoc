const exam = require("../Models/examModel");
const examDetail = require("../Models/examDetailModel");
const asyncHandle = require("../Middleware/asyncHandle");
const errorResponse = require("../Helper/errorResponse");
const uploadFiles = require("../Common/downloadFile");
module.exports = {
    getCreate: asyncHandle(async(req, res, next)=>{
        res.render("../Views/createExam.ejs");
    }),
    create: asyncHandle(async(req, res, next)=>{
        req.body.user = req.user.id;
        req.body.subject = req.params.id;
        const data = await exam.create(req.body);
        req.files.forEach(async ele => {
            let path = ele.path;
            req.body.name = ele.filename;
            let newPath = path.split("\\");
            req.body.path = newPath.join("/");
            req.body.ex = data._id;
            req.body.mimetype = ele.mimetype;
            const detail = await examDetail.create(req.body);
        });        
        res.redirect("back");
    }),
    getAll: asyncHandle(async(req, res, next)=>{
        const data = await exam.find().populate([{
            path:"user",            
        },{
            path:"subject",
        }]);
        // res.json({
        //     data
        // })
        res.render("../Views/Admin/getAllExam.ejs", {data});
    }),
    get: asyncHandle(async(req, res, next)=>{
        const data = await exam.find({subject: req.params.id}).populate([{
            path:"user",            
        },{
            path:"subject",
        }]);
        const sub = {id: req.params.id}
        data.unshift(sub);
        if(!data){
            return next(new errorResponse(401,"data empty"));
            // res.send("ok");
        }
        res.render("../Views/exam.ejs", {data});
        // res.status(200).json({
        //     status:"success",
        //     data
        // })
    }),
    getDetail: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await examDetail.find({ex : id}).populate({
            path: "ex",
            populate:{
                path:"subject",
            }
        });
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.render("../Views/detailExam.ejs", {data})
        // res.status(200).json({
        //     status:"success",
        //     data
        // })
    }),
    delete: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await exam.findByIdAndDelete(id);
        await examDetail.deleteMany({ex: id});
        res.redirect("back");
        // res.status(200).json({
        //     status: "success",
        //     data: "delete exam success."            
        // })
    }),
    edit: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const newData = req.body;        
        const data = await exam.findByIdAndUpdate(id, newData);
        if(!data){
            return next(new errorResponse(400, "edit exam fail"));
        }
        res.status(200).json({
            status: "success",
            data: "edit exam success."            
        })
    }),
    download: asyncHandle(async(req, res, next)=>{
        uploadFiles(examDetail, req.query.id, res);
    })

}