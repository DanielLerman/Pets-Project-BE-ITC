const express=require('express')
const router=express.Router();
const {handleRefrershToken}=require('../controllers/refreshTokenController');

router.get('/', handleRefrershToken);

module.exports= router;