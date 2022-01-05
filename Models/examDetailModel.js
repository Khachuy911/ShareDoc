const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examDetailSchema = new Schema({
    ex:{
        type:String,
        ref:"exam"
    },
    mimetype:{
        type:String,
        require:[true, "mimefile exam empty"]
    },
    name:{
        type:String,  
        required:[true, "Tên không được để trống"]  
    },
    path:{
        type:String,
        require:[true, "path exam empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('examDetail', examDetailSchema);