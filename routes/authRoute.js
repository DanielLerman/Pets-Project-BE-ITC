const express=require('express')
const router=express.Router();
const {handleLogin,isUserSigned,matchPasswords,isUserAdmin}=require("../controllers/authController")

router.post('/',isUserAdmin, handleLogin,isUserSigned,matchPasswords);


module.exports=router 