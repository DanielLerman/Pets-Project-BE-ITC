const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   rePassword:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    }, 
   role:{
        user: {
            type: Number,
            default:2001
        },
        admin: Number
    } ,
    refreshToken: String
   
})

const User=mongoose.model('Users', userSchema);
module.exports=User