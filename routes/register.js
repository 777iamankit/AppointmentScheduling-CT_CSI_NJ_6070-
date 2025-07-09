const express=require('express');
const user=require('../model/user.js');
const bcrypt=require('bcryptjs');
const router=express.Router();

router.post('/',async(req,res)=>{
  try{
    const {name,email,sex,dob,number,password}=req.body;
    const existingUser=await user.findOne({email});
    if(existingUser){
     return  res.status(400).send('User already exist');
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser=new user({
      name,
      email,
      sex,
      dob,
      number,
      password: hashedPassword
    });

    await newUser.save();
    res.status(200).send('Registered successfully');
  }catch(error){
    console.log(error);
    res.status(500).send('Server error');
  }
});


module.exports=router;

