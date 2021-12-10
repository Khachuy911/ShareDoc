const project = require("../Models/projectModel");
const asyncHandle = require("../Middleware/asyncHandle");
const errorResponse = require("../Helper/errorResponse");
module.exports = {
    create: asyncHandle(async(req, res, next)=>{
        const data = await project.create(req.body);
        res.status(200).json({
            status: "success",
            data: "Create project success."            
        })
    }),
    get: asyncHandle(async(req, res, next)=>{
        const data = await project.find();
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
        const data = await project.findById(id);
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
        const data = await project.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            data: "delete project success."            
        })
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
    })

}