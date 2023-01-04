const express=require('express');
const {isPetExist}=require('../middlewares/petsMiddleware')
const {addPet, readAllPets,deletePet}=require('../models/myPetsModel')
const {deletePetById, createPet, getAllPets}=require('../controllers/petsControllers')
const router=express.Router();



router.post('/', isPetExist, createPet);
router.get('/', getAllPets)
router.delete('/:PetId',deletePetById);

module.exports=router;