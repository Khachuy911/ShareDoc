const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const documentDetailSchema = new Schema({
    doc:{
        type:String,
        ref:"document"
    },
    mimetype:{
        type:String,
        required:[true, "mimetype document empty"]
    },
    path:{
        type:String,
        require:[true, "path document empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('documentDetail', documentDetailSchema);