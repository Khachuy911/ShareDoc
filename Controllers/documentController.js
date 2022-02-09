const document = require("../Models/documentModel");
const documentDetail = require("../Models/documentDetailModel");
const asyncHandle = require("../Middleware/asyncHandle");
const errorResponse = require("../Helper/errorResponse");
const uploadFiles = require("../Common/downloadFile");
module.exports = {
    getCreate: asyncHandle(async(req, res, next)=>{
        res.render("../Views/createDoc.ejs");
    }),
    create: asyncHandle(async(req, res, next)=>{
        req.body.user = req.user.id;
        req.body.subject = req.params.id;
        const data = await document.create(req.body);
        req.files.forEach(async ele => {
            let path = ele.path;
            req.body.name = ele.originalname;
            let newPath = path.split("\\");
            req.body.path = newPath.join("/");
            req.body.doc = data._id;
            req.body.mimetype = ele.mimetype;
            const detail = await documentDetail.create(req.body);
        });        
        res.redirect("back");
    }),
    getAll: asyncHandle(async(req, res, next)=>{
        const data = await document.find().populate([{
            path:"user",            
        },{
            path:"subject",
        }]);
        // res.json({
        //     data
        // })
        res.render("../Views/Admin/getAllDoc.ejs", {data});
    }),
    get: asyncHandle(async(req, res, next)=>{
        const data = await document.find({subject: req.params.id}).populate([{
            path:"user",            
        },{
            path:"subject",
        }])
        const sub = {id: req.params.id}
        data.unshift(sub);
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.render("../Views/document.ejs", {data});
        // res.status(200).json({
        //     status:"success",
        //     data
        // })
    }),
    getDetail: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await documentDetail.find({doc: id}).populate({
            path:"doc",
            populate:{
                path:"subject",
            }
        });
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.render("../Views/detailDoc.ejs", {data})
        // res.status(200).json({
        //     status:"success",
        //     data
        // })
    }),
    delete: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await document.findByIdAndDelete(id);
        await documentDetail.deleteMany({doc: id});
        res.redirect("back")
        // res.status(200).json({
        //     status: "success",
        //     data: "delete document success."            
        // })
    }),
    edit: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const newData = req.body;        
        const data = await document.findByIdAndUpdate(id, newData);
        if(!data){
            return next(new errorResponse(400, "edit document fail"));
        }
        res.status(200).json({
            status: "success",
            data: "edit document success."            
        })
    }),
    download: asyncHandle(async(req, res, next)=>{
        uploadFiles(documentDetail, req.query.id, res);
    })

}