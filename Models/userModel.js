const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const client = require("../Config/redis");
const userSchema = new Schema({
  email:{
      type: String,
      required: [true, "Email empty"],
      unique: [true,"Email is existed"]
  },
  password:{
      type: String,
      required: [true, "password empty"],
      select: false
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
      required: [true, "phone empty"],
      unique: [true, "phone number is existed"]
  },
  avatar:{
      type: String,
  },
  name:{
      type: String,
      required: [true, "name empty"]
  },
  birdDay:{
      type: Date,
      required:[true, "bird day empty"]
  }
},{
    timestamp : true,
});


userSchema.pre("save", async function(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPw = undefined;
    next();
})

userSchema.methods.signToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
userSchema.methods.signRefreshToken = async function(){
    const refreshToken = await jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    })
    await client.set(`${this._id}`, refreshToken);
    return refreshToken;
}
userSchema.methods.matchPassword = function(password, hashPassword){
    return bcrypt.compare(password, hashPassword);
}
userSchema.methods.signResetToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_RESET_EXPIRES_IN
    })
}

module.exports = mongoose.model('user', userSchema);