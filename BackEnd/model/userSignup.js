const mongoose=require("mongoose")
const contactSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
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
    }
})

const userCollection=new mongoose.model('userCollection',contactSchema)

module.exports=userCollection;