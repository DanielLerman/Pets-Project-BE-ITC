const { checkPetExistByName } = require("../models/myPetsModel");
const isPetExist = (req, res, next) => {
  console.log(req.body);
  const { name } = req.body;
  const pet = checkPetExistByName(name);
  console.log(pet);
  if (pet) {
    res.status(400).send("pet is alredy exist");
    return;
  }
  next();
};
module.exports = { isPetExist };
