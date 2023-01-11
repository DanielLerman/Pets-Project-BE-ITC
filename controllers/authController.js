const express=require('express')
const User=require('../database/Users');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

const handleLogin=async(req,res,next)=>{
    const {email, password}=req.body;
    if(!email||!password){
        res.status(400).json({'message':"email amd password are required"})
        return
    }  next()
}

const isUserSigned=async(req,res,next)=>{
    const foundUser=User.findOne({email: req.body.email}).exec()
    if(!foundUser){
        res.status(401)//unauthuraised
        return
    } next()
}

const matchPasswords=async(req,res,next)=>{
    const foundUser= await User.findOne({email: req.body.email}).exec( )
    const match=await bcrypt.compare(req.body.password, foundUser.password)
        if(match){
        const roles=Object.values(foundUser.role);
        console.log(roles)
        const accessToken=jwt.sign(
            {"userId":foundUser._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30s"}
        ) ;
        const refreshToken=jwt.sign(
            {"userId":foundUser._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        ) ;

        ///saving refresh toke with current user
       foundUser.refreshToken=refreshToken;
       const result=await foundUser.save();
       console.log(result)
    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', seccure: true, maxAge: 24 * 60 * 60 * 1000})
    res.json({accessToken})
//    res.send("this is the result", result)

} else {
    res.sendStatus(401)
}
}

module.exports={handleLogin,isUserSigned,matchPasswords}