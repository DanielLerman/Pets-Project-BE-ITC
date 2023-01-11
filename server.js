const express = require("express");
const cors = require("cors");
require("dotenv").config();
const myPetRoute = require("./routes/myPetRoute");
const signUpRoute = require("./routes/signUpRoute");
const authRoute=require('./routes/authRoute')
const refreshRoute=require('./routes/refreshRoute')
const logoutRoute=require('./routes/logOutRoute')
const app = express();
const verifyJWT=require('./middlewares/verifyJwt')
const cookieParser=require('cookie-parser')
const mongoose = require("mongoose");
const connectDB = require("./db");
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors({credentials:"http://localhost:3000"}));
app.use(cookieParser())
app.use("/SignUp", signUpRoute);
app.use("/LogIn", authRoute);
app.use("/refresh", refreshRoute);
app.use("/LogOut",logoutRoute)

// app.use(verifyJWT);
app.use("/pets", myPetRoute);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`Listenint on ${PORT}`);
  });
});
