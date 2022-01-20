const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const documentSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject"
    },
    name:{
        type: String,
        required: [true, "Tên không được để trống"]
    },
    download:{
        type: Number,
        default: 0
    },
    introduce: {
        type: String,
        required: [true, "Chi tiết tài liệu không được để trống"]
    },
    publish_Year:{
        type: String,
        required:[true, "Năm xuất bản không được để trống"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('document', documentSchema);