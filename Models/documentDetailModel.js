const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const documentDetailSchema = new Schema({
    doc:{
        type:String,
        ref:"document"
    },
    typeFile:{
        type:String,
        require:[true, "typeFile empty"]
    },
    path:{
        type:String,
        require:[true, "path document empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('documentDetail', documentDetailSchema);