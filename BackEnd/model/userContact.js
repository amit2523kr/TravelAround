const mongoose=require("mongoose")
const customerSupportSchema=new mongoose.Schema({
   name:{
        type:String
    },
   email:{
        type:String,
        required:true
    },
    number:{
        type:String
    },
    message:{
        type:String,
        required:true
    }
})

const customerQqueryCollection=new mongoose.model('customerQqueryCollection',customerSupportSchema)

module.exports=customerQqueryCollection;
