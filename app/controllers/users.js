const User=require('../models/users');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

// User Registration
const usersControll={};
usersControll.register=async(req, res)=>{
    const body=req.body;
    try{
        const user=new User(body);
        const salt=await bcrypt.genSalt()
        const encryptedPassword= await bcrypt.hash(user.password,salt);
        user.password=encryptedPassword;
        await user.save()
        res.status(201).json({message:"User register succcesfully"});
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}