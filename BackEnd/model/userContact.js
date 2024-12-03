const mongoose=require("mongoose")
const customerSupportSchema=new mongoose.Schema({
   email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const customerQqueryCollection=new mongoose.model('customerQqueryCollection',customerSupportSchema)

module.exports=customerQqueryCollection;