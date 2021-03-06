const asyncHandle = require("../Middleware/asyncHandle");
const errorResponse = require("../Helper/errorResponse");
const subjects = require("../Models/subjectModel");

module.exports = {
    create: asyncHandle(async(req, res, next)=>{
        const data = await subjects.create(req.body);
        res.status(201).json({
            status:"success",
            data: "create subject success"
        })
    }),
    get: asyncHandle(async(req, res, next)=>{
        const data = await subjects.find();
        if(!data) return next(new errorResponse(400, "subject empty"));
        res.status(201).json({
            status:"success",
            data
        })
    }),
    getDetail: asyncHandle(async(req, res, next)=>{
        const data = await subjects.findById(req.params.id);
        if(!data) return next(new errorResponse(400, "subject empty"));
        res.status(201).json({
            status:"success",
            data
        })
    }),
    delete: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const data = await subjects.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            data: "delete suject success."            
        })
    }),
    edit: asyncHandle(async(req, res, next)=>{
        const id = req.params.id;
        const newData = req.body;        
        const data = await subjects.findByIdAndUpdate(id, newData);
        if(!data){
            return next(new errorResponse(400, "edit suject fail"));
        }
        res.status(200).json({
            status: "success",
            data: "edit subject success."            
        })
    })
}