const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
      type: String,
      required: [true, "Email empty"],
      unique: [true,"Email exists"]
  },
  password:{
      type: String,
      required: [true, "password empty"]
  },
  confirmPw:{
      type:String,
      validate:{
          validator: function (el){
              return el === this.password;
          },
          message:"password not the same"
      }
  },
  role:{
      type: String,
      default: "user",
  },
  phone:{
      type: Number,
      unique: [true, "phone empty"],
  },
  avatar:{
      type: String,
  },
  name:{
      type: String,
      required: [true, "name empty"]
  },
  favorite:{
      type: String,
  },
  birdDay:{
      type: Date,
      required:[true, "bird day empty"]
  },
  reset_Pw:{
      type: String
  },
  Reset_Pw_ExpiresIn:{
      type: Date
  }
},{
    timestamp : true,
});
module.exports = mongoose.model('user', userSchema);