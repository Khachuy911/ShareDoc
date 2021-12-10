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
        required: [true, "name doc empty"]
    },
    download:{
        type: Number,
        default: 0
    },
    introduce: {
        type: String,
        required: [true, "introduce empty"]
    },
    publish_Year:{
        type: String,
        required:[true, "publish year empty"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('document', documentSchema);