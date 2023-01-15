const express=require('express')
const router=express.Router();
const {checkPassword,findUser,addLikedPet,isLikedPetExist}=require("../controllers/updateUserController")
const {updateHashedPassword}=require('../middlewares/updatePassword')
// const {checkPassword}=require("../controllers/registerController")

router.post('/',checkPassword,findUser)
router.patch('/',isLikedPetExist, addLikedPet)


module.exports=router 