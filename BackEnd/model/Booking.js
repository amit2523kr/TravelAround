const mongoose=require("mongoose")
const bookingDetails=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    numPersons:{
        type:String,
        required:true
    },
    numRooms:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const bookingCollection=new mongoose.model('bookingCollection',bookingDetails)
module.exports=bookingCollection;