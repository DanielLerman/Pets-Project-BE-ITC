const User=require('../database/Users');
const bcrypt = require("bcrypt");

const checkFields=async(req, res, next)=>{
    const { fullName, email, password, rePassword, phoneNumber } = req.body;
    if (!req.body.email || !req.body.password || !req.body.rePassword) {
       res.status(400).json({ message: "username amd password are required." });
       return
    }next()
}
const checkPassword=async(req,res, next)=>{
    if (req.body.password != req.body.rePassword){
     res.status(400).json({ message: "passwords dont match." });  
     return 
}next()
}
 
const isExist=async(req, res, next)=>{
    const duplicate=await User.findOne({email:req.body.email}).exec();
    if(duplicate){
         res.sendStatus(409)
         return
    }next() 
}

const createUser = async (req, res, next) => {
    try{
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
        ...req.body,
        password:hashedPwd
      });
      res.status(201).send(newUser)
    //   res.status(201).json({ success: `newuser ${newUser.email} created!` });
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message });
    }   
};

const getUsers=async(req,res)=>{
    const allUsers=await User.find();
    if(!allUsers) return res.status(204).json({ message: "no users found" })
    res.json(allUsers)

      
  }
module.exports = {createUser ,checkFields, checkPassword, isExist,getUsers };
