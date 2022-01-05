const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
    name:{
        type: String,
        required: [true, "Tên tài liệu không được để trống"]
    },
    introduce:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('subject', subjectSchema);