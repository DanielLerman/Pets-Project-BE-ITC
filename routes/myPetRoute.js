const express=require('express');
const {isPetExist}=require('../middlewares/petsMiddleware')
const {addPet, readAllPets,deletePet}=require('../models/myPetsModel')
const {deletePetById, createPet, getAllPets,getPetById}=require('../controllers/petsControllers')
const router=express.Router();


router.post('/', createPet);
router.get('/', getAllPets)
// router.get('/?',getPetBySearch)
router.get('/:PetId',getPetById)
router.delete('/:PetId',deletePetById);


module.exports=router;