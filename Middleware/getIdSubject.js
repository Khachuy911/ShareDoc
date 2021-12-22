const errorRespose = require("../Helper/errorResponse");
const asyncHandle = require("./asyncHandle");
const subjects = require("../Models/subjectModel");

module.exports.getIdSubject = asyncHandle(async(req, res, next)=>{
    const data = await subjects.findById(req.params.id);
    if(!data) return next(new errorResponse(400, "subject empty"));
    req.subjects = data;
    next();
})
