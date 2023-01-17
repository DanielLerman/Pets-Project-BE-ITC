const express = require("express");
const cors = require("cors");
require("dotenv").config();
const myPetRoute = require("./routes/petRoute");
const signUpRoute = require("./routes/signUpRoute");
const authRoute = require("./routes/authRoute");
const refreshRoute = require("./routes/verifyRoute");
const logoutRoute = require("./routes/logOutRoute");
const searchPetRoute = require("./routes/searchRoute");
const updateUserRoute=require('./routes/updateUserRoute')
const app = express();
const verifyJwrRoute = require("./routes/verifyRoute");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./db");
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('images'))
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/SignUp", signUpRoute);
app.use("/LogIn", authRoute);
app.use("/refresh", refreshRoute);
app.use("/LogOut", logoutRoute);

app.use("/welcome",verifyJwrRoute);
app.use("/Pets", myPetRoute);
app.use("/Search", searchPetRoute);
app.use("/Update",updateUserRoute)

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`Listenint on ${PORT}`);
  });
});
