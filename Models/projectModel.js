const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
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
        required: [true, "name project empty"]
    },
    Download:{
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
    timestamp: true
})

module.exports = mongoose.model('project', projectSchema);