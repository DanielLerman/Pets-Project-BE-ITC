const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const petsSchema=new Schema({
    name:{
        type:String,
        required:true
    }, 
    height:{
        type:String,
        required:true
    }, 
})