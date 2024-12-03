const express= require("express");
const userCollection=require('./model/userSignup');
const bookingCollection=require('./model/Booking');
const cors = require('cors');
const customerQqueryCollection = require("./model/userContact");
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const saltRounds = 10;
const PORT=process.env.PORT || 8000;
require('./db/dbConnection');
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:true,credentials:true}))
app.get('/',cors(), (req, res) => {
   
})
app.post('/signup', async(req, res) => {
    const{fname,lname,email,password}=req.body
    const data={
        fname:fname,
        lname:lname,
        email:email,
        password:password
    } 
    try{
              const check=await userCollection.findOne({email:email})
              if(check){
                  res.json("exist");
              }else{
                  res.json("donot exist");
                  await userCollection.insertMany([data])
              } 
          }catch(e){
              res.json("donot exist");
          }
})

app.post('/login', async(req, res) => {
  const{email,password}=req.body
  try{
      const check=await userCollection.findOne({email:email})
     
      if(check){ 
        const passwordMatch = await bcrypt.compare(password,check.password);
        if (passwordMatch) {
            res.json("exist");
          } else {
            alert("Wrong password.Please Enter again");
            res.json("incorrect password");
          }
      }else{
          res.json("donot exist");
      } 
  }catch(e){
      res.json("donot exist");
  }
})
app.post('/platinum',async(req,res)=>{
    const{name,startDate,endDate,numPersons,numRooms,price}=req.body;
    const data={
        name:name,
        startDate:startDate,
        endDate:endDate,
        numPersons:numPersons,
        numRooms:numRooms,
        price:price
    }
    await bookingCollection.insertMany([data])
})
app.post('/message',async(req,res)=>{
    const{email,number,message}=req.body;
    const data={
        email:email,
        number:number,
        message:message
    }
    await customerQqueryCollection.insertMany([data])
})
app.listen(PORT,()=>{
  console.log("port connected");
})



