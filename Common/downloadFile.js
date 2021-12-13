const fs = require("promise-fs");
const path = require("path");
const asyncHandle = require("../Middleware/asyncHandle");
module.exports = async(db, idDoc, res)=>{
        const data = await db.findById(idDoc);
        let pathFile = `./${data.path}`;        
        const name = path.basename(pathFile);
        res.setHeader("Content-Type", data.mimetype)
        res.setHeader("Content-disposition", `attachment;filename=${name}` );
        const readStream = fs.createReadStream(pathFile);
        readStream.pipe(res);
}