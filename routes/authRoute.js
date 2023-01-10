const express=require('express')
const router=express.Router();
const {handleLogin,isUserSigned,matchPasswords}=require("../controllers/authController")

router.post('/',handleLogin,isUserSigned,matchPasswords);


module.exports=router 