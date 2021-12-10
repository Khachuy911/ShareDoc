const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examDetailSchema = new Schema({
    ex:{
        type:String,
        ref:"exam"
    },
    typeFile:{
        type:String,
        require:[true, "typeFile empty"]
    },
    path:{
        type:String,
        require:[true, "path exam empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('examDetail', examDetailSchema);