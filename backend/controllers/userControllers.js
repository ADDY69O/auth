const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
const jwt =require("jsonwebtoken");


 const Login = async(req,res)=>{

    
    try {
    const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please provide all the credentials",status:"failed"})
        }

        const prevUser = await User.findOne({email});

        if(!prevUser){
            return res.status(400).json({message:"User not found",status:"failed"});
        }
        else {
            if(await bcrypt.compare(password,prevUser.password)){
               //generating jwt token with newUserId
               const payload = {userId : prevUser._id}
               const token = jwt.sign(payload,process.env.JWT_SECRET,{
                   expiresIn:"30d",
               })
        return res.status(200).json({message:"Successfully logged in ",status:"success", user:prevUser,token})
            }
            else{
                return res.status(400).json({status:"failed",message:"Invalid email or password"});
            }
        }

} catch (error) {
    return res.status(400).json({error:"Internal Server error",status:"failed"})  
}



    
}


 const Register = async(req,res)=>{

    try {
    
        const {email,password,phone,username}=req.body;
        console.log(email,password,phone,username)

        if(!email || !password || !phone || !username){
            return res.status(400).json({message:"please provide all the credentitals",status:"failed"});
        }
        else if (!username || typeof username !== 'string' ||  /\d/.test(username) ) {
            return res.status(400).json({message:' enter valid username it contains only alphabets'});
           
        }
        else if (!(email.includes('@') && email.includes('.') )  ||  !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) ) {
            return res.status(400).json({message:'Invalid Email'});  
        }
        else if (! ((phone.length === 10 ) && !isNaN(phone))  ) {
            return res.status(400).json({message:'Mobile No should be a number with a length of 10'});
            
        }
        else if (!(password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password))) {
            return res.status(400).json({message:'Password should be at least 8 characters long and alphanumeric'});
          
        }
        else{
        const prevUser = await User.find({  email } );


        if(prevUser.length>0){
            console.log(prevUser)
            return res.status(400).json({message:"user already exist",status:"failed"})
        }
        

     
        const newUser = await User.create({email,password,phone,username});

        //generating jwt token with newUserId
        // const payload = {userId : newUser._id}
        // const token = jwt.sign(payload,process.env.JWT_SECRET,{
        //     expiresIn:"30d",
        // })
        return res.status(200).json({message:"user created Successfully",status:"success"});
    }
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:"Internal Server error",status:"failed"})
    }

}


module.exports={Login ,Register}