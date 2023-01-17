const Pets = require("../database/Pets");




const createPet = async (req, res) => {
  // if(!req?.body?.name)
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
};

const getAllPets = async (req, res) => {
  const pets = await Pets.find();
  if (!pets) return res.status(204).json({ message: "no pets found" });
  res.json(pets);
};

const getPetById = async (req, res) => {
  const pet = await Pets.findOne({ _id: req.params.PetId }).exec();
  if (!pet) {
    return res
      .status(204)
      .json({ message: `No pet matches ID ${req.params.PetId}` });
  }
  res.send(pet);
};

const deletePetById = async (req, res) => {
  // if(!req?.body?.id) returnres.status(400).json({'message':'Pets Id required'});
  const pet = await Pets.findOne({ _id: req.params.PetId }).exec();
  if (!pet) {
    return res.status(204).json({ message: `No pet matches ID ${req.params.PetId}` });
  }
  const deleted = await Pets.deleteOne({ _id: req.params.PetId });
  if (deleted) {
    res.send({ ok: true, deletedId: deleted });
  }
};



module.exports = {
  deletePetById,
  createPet,
  getAllPets,
  getPetById
};