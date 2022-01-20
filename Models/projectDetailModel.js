const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectDetailSchema = new Schema({
    pro:{
        type:String,
        ref:"project"
    },
    mimetype:{
        type:String,
        require:[true, "mimetype project empty"]
    },
    name:{
        type:String,  
        required:[true, "Tên không được để trống"]  
    },
    path:{
        type:String,
        require:[true, "path project empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('projectDetail', projectDetailSchema);