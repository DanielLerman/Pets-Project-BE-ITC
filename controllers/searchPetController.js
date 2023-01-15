const Pets = require("../database/Pets");

const getPetBySearch = async (req, res) => {
    const pet = await Pets.find({$or: [{ name: req.query.name }, {adoptionStatus:req.query.adoptionStatus },{ weight: req.query.weight }, { height: req.query.height } ]});
    if (!pet) {
      return res.status(204).json({ message: `No pet matches ID ${req.query.name}` });
    } else {
      res.send(pet);
      console.log("Res ", pet);
    }
  };

  module.exports={getPetBySearch}