  const mongoose=require('mongoose');

  const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    sex: String,
    dob: Date,
    number: String,
    password: String,
  });

  module.exports=mongoose.model('User',userSchema);