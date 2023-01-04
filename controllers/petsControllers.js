const {addPet, readAllPets,deletePet}=require('../models/myPetsModel')
const { v4: uuidv4 } = require('uuid');
const createPet=(req,res)=>{
    try{
  const newPet={
    ...req.body,
    id:uuidv4(),
    date: new Date()
  };
  const addedPet=addPet(newPet);
  if(addedPet){
    res.send(newPet)
  }
}catch(err){
    console.log(err) 
    res.status(500).send(err);
}
}

const getAllPets=(req, res)=>{
    try{
      let pets=[]
      db.collection('pets')
      .find()
      .forEach(pet=>pets.push(pet))
        // const allPets=readAllPets();
        // console.log(pets);
      .then(()=>{
        res.status(200).json(pets)
      })
      // res.send(pets);
    }catch(err){ 
        console.log(err);
        res.status(500).send(err);
    }
}

const deletePetById=(req, res)=>{
    const {PetId}=req.params;
 const deleted=deletePet(PetId)
 if(deleted){
     res.send({ok:true, deletedId:PetId})
 }
}

module.exports={deletePetById,createPet,getAllPets}