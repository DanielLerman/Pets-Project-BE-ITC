const express = require("express");
const User = require("../database/Users");
const bcrypt = require("bcrypt");

const checkPassword = async (req, res, next) => {
  if (req.body.password != req.body.rePassword) {
    res.status(400).json("passwords dont match.");
    return;
  }
  next();
};

const findUser = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  const { body } = req;

  // check for empty string fields in req.body
  const emptyFields = Object.keys(body).filter((key) => body[key] === " ");
  if (emptyFields.length) {
    return res
      .status(400)
      .send(`Cannot update fields with empty string: ${emptyFields}`);
  }

  // create update object, only adding non-empty fields
  const update = Object.keys(body).reduce((acc, key) => {
    if (body[key]) {
      acc.$set = { ...acc.$set, [key]: body[key] };
    }
    return acc;
  }, {});
  const updatedUser = await User.findOneAndUpdate({ refreshToken: refreshToken },update,{ returnDocument: "after" });
  res.json(updatedUser);
};

const isLikedPetExist = async (req, res, next) => {
  const duplicate = await User.findOne({ likedPets: req.params.petId }).exec();
  if (duplicate) {
    res.status(409).json({ message: "alredy saved" });
    return;
  }
  next();
};

const addLikedPet = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) return res.sendStatus(403);
  const updatedUser = await User.findOneAndUpdate( { refreshToken:refreshToken}, { $push: { likedPets: req.params.petId } },{ returnDocument: "after" });
  res.send( updatedUser)
}; 

// await Pets.find({_id:{$in:{ req.body}}})


const deleteLikedPet=async(req,res)=>{
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) return res.sendStatus(403);
  const updatedUser = await User.findOneAndUpdate( { refreshToken:refreshToken}, {$pull: { likedPets: req.params.petId }});
   res.send(updatedUser)

}



module.exports = { checkPassword, findUser, addLikedPet, isLikedPetExist,deleteLikedPet };
