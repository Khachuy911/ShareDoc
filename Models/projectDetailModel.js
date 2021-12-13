const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectDetailSchema = new Schema({
    pro:{
        type:String,
        ref:"project"
    },
    mimetype:{
        type:String,
        require:[true, "mimefile project empty"]
    },
    path:{
        type:String,
        require:[true, "path project empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('projectDetail', projectDetailSchema);