const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name empty"]
    },
    introduce:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('subject', subjectSchema);