const express = require("express");
const User = require("../database/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// process.env.REFRESH_TOKEN_SECRET,
const isUserAdmin=async(req,res,next)=>{
  const {admin, email, password}=req.body;
  if(admin!=""&&admin!=process.env.ADMIN) {
    res.json({ message: "key not valid " })
    return
  } 
  if(admin==process.env.ADMIN || admin=="") return next()
}

const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email amd password are required" });
    return;
  }
  next();
};

const isUserSigned = async (req, res, next) => {
  const foundUser = User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    res.status(401); //unauthuraised
    return;
  }
  next();
};

const matchPasswords = async (req, res, next) => {
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  console.log(foundUser.password)
  const match = await bcrypt.compare(req.body.password, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.role);
    // console.log()
    // const accessToken = jwt.sign(
    //   { userId: foundUser._id },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "30s" }
    // );
    const refreshToken = jwt.sign(
      { userId: foundUser._id ,},
      
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    ///saving refresh toke with current user
    foundUser.refreshToken = refreshToken;
     foundUser.role.admin=req.body.admin;

    
 
    const result = await foundUser.save();
res.cookie("jwt", refreshToken, {httpOnly: true,maxAge: 24 * 60 * 60 * 1000 });
    // res.json({accessToken, result})
    res.send(result);
    //    res.send("this is the result", result)
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin, isUserSigned, matchPasswords,isUserAdmin};
