const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectDetailSchema = new Schema({
    project:{
        type:String,
        ref:"project"
    },
    typeFile:{
        type:String,
        require:[true, "typeFile empty"]
    },
    path:{
        type:String,
        require:[true, "path project empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('projectDetail', projectDetailSchema);