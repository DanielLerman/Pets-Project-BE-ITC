const fs=require('fs');
const path=require('path');
const pathToMyPetsDB=path.resolve(__dirname, '../database/myPetsDB.json')

const readAllPets=()=>{
    try{
    const petsList=fs.readFileSync(pathToMyPetsDB);
    return JSON.parse(petsList)
    }catch(err){console.log(err)}
}

const addPet=(newPet)=>{
    try{
    const allPets=readAllPets();
    allPets.push(newPet);
    fs.writeFileSync(pathToMyPetsDB, JSON.stringify(allPets))
    return true
    }catch(err){console.log(err)}
}

const deletePet=(petId)=>{
   const allPets=readAllPets();
   const updatedPetsList=allPets.filter(pet=>pet.id!==petId);
   fs.writeFileSync(pathToMyPetsDB, JSON.stringify(updatedPetsList))
   return true

}

const checkPetExistByName=(petName)=>{
    const allPets=readAllPets();
    const foundPet=allPets.find(pet=> pet.name===petName);
    return foundPet;
}

module.exports={readAllPets, addPet,deletePet, checkPetExistByName};