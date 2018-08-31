'use strict'
const bcrypt = require("bcrypt-nodejs")
const crypto = require("crypto")
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  displayName: String,
  avatar: String,
  password: {type: String, select: false},
  signupDate: {type: Date, default: Date.now() },
  lastLogin: Date
})

UserSchema.pre("save", (next) => {
  let user = this
  //if(!user.isModified("password")) return next()
  
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next()
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next()
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.gravatar = function(){
  if(!this.email) return "https://www.gravatar.com/avatar/?s=200&d=retro"
  const md5 = crypto.createHash("md5").update(this.email).digest("hex")
  return "https://www.gravatar.com/avatar/" + md5
}

module.exports = mongoose.model("User", UserSchema)