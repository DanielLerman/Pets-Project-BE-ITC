const express=require('express');
const {isPetExist}=require('../middlewares/petsMiddleware')
const {addPet, readAllPets,deletePet}=require('../models/myPetsModel')
const {deletePetById, createPet, getAllPets,getPetById,getSavedPets}=require('../controllers/petsController')
const {upload,generateUrl}=require('../middlewares/imagesMiddleware')
const {verifyJwt}=require('../middlewares/verifyJwt')
const {isLikedPetExist, addLikedPet, deleteLikedPet}=require('../controllers/updateUserController')
const {findTheUser}=require('../middlewares/savedPetsMiddleware')

const router=express.Router();


router.post('/', upload.single('petImage'),generateUrl, createPet);
router.post('/:petId/save',verifyJwt,isLikedPetExist, addLikedPet)
router.delete('/:petId/save',verifyJwt,deleteLikedPet)
router.get('/', getAllPets)
router.get('/:PetId',getPetById)
router.get('/user/:id',findTheUser, getSavedPets)
router.delete('/:PetId',deletePetById);


module.exports=router;