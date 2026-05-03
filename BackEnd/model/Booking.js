const mongoose=require("mongoose")
const bookingDetails=new mongoose.Schema({
    hotelName:{
        type:String
    },
    email:{
        type:String
    },
    room:{
        type:String
    },
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
    },
    bookingId:{
        type:String
    },
    paidAt:{
        type:String
    }
})

const bookingCollection=new mongoose.model('bookingCollection',bookingDetails)
module.exports=bookingCollection;
