const {checkPetExistByName}=require('../models/myPetsModel')
const isPetExist =(req,res, next )=>{
    const {name}=req.body
    const pet=checkPetExistByName(name)
    if(pet){
        res.status(400).send("pet is alredy exist")
        return
    }
    next()
}
module.exports={isPetExist}