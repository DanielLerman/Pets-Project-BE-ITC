const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
   unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },
  rePassword: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  role: {
    user: {
      type: Number,
      default: 2001,
    },
    admin: Number,
  },
  refreshToken: String,
  likedPets: { type: Array },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
