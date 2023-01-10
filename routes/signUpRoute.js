const express=require('express')
const {checkFields, checkPassword, isExist,createUser}=require('../controllers/registerController')
const router=express.Router();
const {handleNewUser}=require("../controllers/registerController")

router.post('/',checkFields,checkPassword, isExist,createUser);


module.exports=router 