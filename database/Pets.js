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
    weight:{
        type:String,
        required:true
    },
    hypoallergenic:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:false
    },  
    adoptionStatus:{
        type:String,
        required:false
    }, 
    image:{
        type:String,
        required:false
    }, 
    bio:{
        type:String,
        required:false
    }, 
    diet:{
        type:String,
        required:false
    }, 
})

const Pet=mongoose.model('Pets', petsSchema);
module.exports=Pet