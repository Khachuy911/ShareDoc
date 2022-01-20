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
subjectSchema.index(
  {
    name: "text",
    introduce: "text",
  },
  {
    weights: {
      // độ ưu tiên, số càng cao độ ưu tiên càng lớn
      name: 5,
      description: 1,
    },
  }
);
module.exports = mongoose.model('subject', subjectSchema);