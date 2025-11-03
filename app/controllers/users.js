const User=require('../models/users');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');
const { validationResult } = require('express-validator');

// User Registration
const usersControll={};
usersControll.register= async(req, res)=>{
    const body=req.body;
    console.log(body)
    try{
        const user=new User(body);
        const salt=await bcryptjs.genSalt()
        const encryptedPassword=await   bcryptjs.hash(user.password,salt);
        user.password=encryptedPassword;
        await user.save()
        res.status(201).json({message:"User register succcesfully"});
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }
}
usersControll.login=async(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req)
    if(!errors.isEmpty()){
 return res.json({errors:errors.array()})
    }
    try{
        const user= await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"user not found with thiss email"})
        }
        const isPaaswordMarch =await bcryptjs.compare(password,user.password)
         if(!isPaaswordMarch){
            return res.status(403).json({error:"invalide password"})
         }


          const tokenData={
            id:user._id,
            role:user.role,
            email:user.email
          }
          const token=jwt.sign(tokenData,"secretKey",{expiresIn:"1d"})
         // user.token=token;
          res.status(200).json({messageL:"login sucess",status:"success", token:token})
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }

}
module.exports={usersControll}