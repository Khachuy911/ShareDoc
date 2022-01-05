const project = require("../Models/projectModel");
const projectDetail = require("../Models/projectDetailModel")
const asyncHandle = require("../Middleware/asyncHandle");
const errorResponse = require("../Helper/errorResponse");
const uploadFiles = require("../Common/downloadFile");
module.exports = {
    getCreate: asyncHandle(async(req, res, next)=>{
        res.render("../Views/createPro.ejs");
    }),
    create: asyncHandle(async(req, res, next)=>{
        req.body.user = req.user.id;
        req.body.subject = req.params.id;
        const data = await project.create(req.body);
        req.files.forEach(async ele => {
            let path = ele.path;
            req.body.name = ele.filename;
            let newPath = path.split("\\");
            req.body.path = newPath.join("/");
            req.body.pro = data._id;
            req.body.mimetype = ele.mimetype;
            const detail = await projectDetail.create(req.body);
        });        
        res.redirect("back");
    }),
    getAll: asyncHandle(async(req, res, next)=>{
        const data = await project.find().populate([{
            path:"user",            
        },{
            path:"subject",
        }]);
        // res.json({
        //     data
        // })
        res.render("../Views/Admin/getAllpro.ejs", {data});
    }),
    get: asyncHandle(async(req, res, next)=>{
        const data = await project.find({subject: req.params.id}).populate([{
            path:"user",            
        },{
            path:"subject",
        }]);
        const sub = {id: req.params.id}
        data.unshift(sub);
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.render("../Views/project.ejs", {data});
        // res.status(200).json({
        //     status:"success",
        //     data
        // })
    }),
    getDetail: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await projectDetail.find({pro: id}).populate({
            path:"pro",
            populate:{
                path:"subject",
            }
        });;
        if(!data){
            return next(new errorResponse(401,"data empty"));
        }
        res.render("../Views/detailPro.ejs", {data});
        // res.status(200).json({
        //     status:"success",
        //     data
        // })
    }),
    delete: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await project.findByIdAndDelete(id);
        await projectDetail.deleteMany({pro: id});
        res.redirect("back");
        // res.status(200).json({
        //     status: "success",
        //     data: "delete project success."            
        // })
    }),
    edit: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const newData = req.body;        
        const data = await project.findByIdAndUpdate(id, newData);
        if(!data){
            return next(new errorResponse(400, "edit project fail"));
        }
        res.status(200).json({
            status: "success",
            data: "edit project success."            
        })
    }),
    download: asyncHandle(async(req, res, next)=>{
        uploadFiles(projectDetail, req.query.id, res);
    })

}