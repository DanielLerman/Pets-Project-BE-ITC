const express=require('express');
const router=express.Router();
const {getPetBySearch}=require('../controllers/searchPetController')

router.get('/',getPetBySearch);

module.exports=router;