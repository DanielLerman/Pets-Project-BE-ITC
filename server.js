const express=require('express');

// const {MongoClient}=require('mongodb');
// const {connectToDb, getDb}=require('./db')
const cors=require('cors');
require('dotenv').config();
const myPetRoute=require('./routes/myPetRoute')
const signUpRoute=require('./routes/signUpRoute')
const app=express();
const mongoose=require('mongoose')
const connectDB=require('./db')
const PORT=process.env.PORT || 8080;

connectDB();



app.use(cors());
app.use('/Pets', myPetRoute)
app.use('/SignUp',signUpRoute)

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB')
    app.listen(PORT, ()=>{console.log(`Listenint on ${PORT}`)})
})










