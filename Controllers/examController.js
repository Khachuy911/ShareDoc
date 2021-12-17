const exam = require("../Models/examModel");
const examDetail = require("../Models/examDetailModel");
const asyncHandle = require("../Middleware/asyncHandle");
const errorResponse = require("../Helper/errorResponse");
const uploadFiles = require("../Common/downloadFile");
module.exports = {
    create: asyncHandle(async(req, res, next)=>{
        const data = await exam.create(req.body);
        req.files.forEach(async ele => {
            let path = ele.path;
            let newPath = path.split("\\");
            req.body.path = newPath.join("/");
            req.body.ex = data._id;
            req.body.mimetype = ele.mimetype;
            const detail = await examDetail.create(req.body);
        });        
        res.status(201).json({
            status:"success",
            data: "create exam success"
        })
    }),
    get: asyncHandle(async(req, res, next)=>{
        const data = await exam.find();
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.status(200).json({
            status:"success",
            data
        })
    }),
    getDetail: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await examDetail.find({ex : id}).populate({
            path: "ex"
        });
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.status(200).json({
            status:"success",
            data
        })
    }),
    delete: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await exam.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            data: "delete exam success."            
        })
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