const Pets = require("../database/Pets");
const { addPet, readAllPets, deletePet } = require("../models/myPetsModel");
const { v4: uuidv4 } = require("uuid");

const createPet = async (req, res) => {
  // if(!req?.body?.name){
  //   return res.status(400).json({})

  // }
  try {
    const newPet = await Pets.create({
      ...req.body,
      date: new Date(),
    });
    console.log(newPet);
    res.status(201).json(newPet);
  } catch (err) {
    console.log(err);
  }

  //     try{
  //   const newPet={
  //     ...req.body,
  //     id:uuidv4(),
  //     date: new Date()
  //   };
  //   const addedPet=addPet(newPet);
  //   if(addedPet){
  //     res.send(newPet)
  //   }
  // }catch(err){
  //     console.log(err)
  //     res.status(500).send(err);
  // }
};

const getAllPets = async (req, res) => {
  const pets = await Pets.find();
  if (!pets) return res.status(204).json({ message: "no pets found" });
  res.json(pets);
  // try{
  //   let pets=[]
  //   db.collection('pets')
  //   .find()
  //   .forEach(pet=>pets.push(pet))
  //     // const allPets=readAllPets();
  //     // console.log(pets);
  //   .then(()=>{
  //     res.status(200).json(pets)
  //   })
  //   // res.send(pets);
  // }catch(err){
  //     console.log(err);
  //     res.status(500).send(err);
  // }
};

const deletePetById = async (req, res) => {
  // if(!req?.body?.id) returnres.status(400).json({'message':'Pets Id required'});
  const pet = await Pets.findOne({ _id: req.params.PetId}).exec();
  if (!pet) {
    return res
      .status(204)
      .json({ message: `No pet matches ID ${ req.params.PetId}` });
  }
  const deleted = await Pets.deleteOne({ _id:  req.params.PetId });
  if (deleted) {
    res.send({ ok: true, deletedId: deleted});
  }

};

module.exports = { deletePetById, createPet, getAllPets };
