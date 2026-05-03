const express= require("express");
const userCollection=require('./model/userSignup');
const bookingCollection=require('./model/Booking');
const cors = require('cors');
const customerQqueryCollection = require("./model/userContact");
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const dbConnection = require('./db/dbConnection');
const saltRounds = 10;
const PORT=process.env.PORT || 8000;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:true,credentials:true}))
app.get('/',cors(), (req, res) => {
   res.json({status:"ok"})
})
app.post('/signup', async(req, res) => {
    const{fname,lname,email,password}=req.body
    try{
        const check=await userCollection.findOne({email:email})
        if(check){
            return res.json("exist");
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userCollection.create({
            fname,
            lname,
            email,
            password: hashedPassword
        })

        return res.status(201).json("created");
    }catch(e){
        console.error("Failed to create user:", e);
        return res.status(500).json("error");
    }
})

app.post('/login', async(req, res) => {
  const{email,password}=req.body
  try{
      const check=await userCollection.findOne({email:email})
     
      if(check){ 
        const passwordMatch = check.password === password || await bcrypt.compare(password,check.password);
        if (passwordMatch) {
            res.json("exist");
          } else {
            res.json("incorrect password");
          }
      }else{
          res.json("donot exist");
      } 
  }catch(e){
      res.json("donot exist");
  }
})

app.post('/google-login', async(req, res) => {
  const { credential } = req.body;

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ status: "error", message: "Google Client ID is not configured" });
  }

  if (!credential) {
    return res.status(400).json({ status: "error", message: "Google credential is required" });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      return res.status(401).json({ status: "error", message: "Google email is not verified" });
    }

    const [firstName, ...lastNameParts] = (payload.name || "").trim().split(" ");
    const data = {
      fname: payload.given_name || firstName || "Google",
      lname: payload.family_name || lastNameParts.join(" ") || "User",
      email: payload.email,
      password: await bcrypt.hash(`google:${payload.sub}`, saltRounds),
      authProvider: "google",
      googleId: payload.sub
    };

    const user = await userCollection.findOneAndUpdate(
      { email: payload.email },
      {
        $set: {
          fname: data.fname,
          lname: data.lname,
          authProvider: "google",
          googleId: payload.sub
        },
        $setOnInsert: {
          email: data.email,
          password: data.password
        }
      },
      { new: true, upsert: true }
    );

    return res.json({
      status: "success",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email
      }
    });
  } catch (e) {
    console.error("Failed Google login:", e);
    return res.status(401).json({ status: "error", message: "Google login failed" });
  }
})

async function saveBooking(req,res){
    const {
        bookingId,
        hotelName,
        name,
        email,
        startDate,
        endDate,
        checkIn,
        checkOut,
        numPersons,
        numRooms,
        guests,
        room,
        price,
        amountPaid,
        paidAt
    } = req.body;

    try{
        const data={
            bookingId,
            hotelName,
            email,
            room,
            name: name || hotelName || "Guest booking",
            startDate: startDate || checkIn,
            endDate: endDate || checkOut,
            numPersons: String(numPersons || guests || 1),
            numRooms: String(numRooms || 1),
            price: Number(price || amountPaid),
            paidAt
        }

        const booking = await bookingCollection.create(data)
        return res.status(201).json({status:"created", booking})
    }catch(e){
        console.error("Failed to create booking:", e);
        return res.status(500).json({status:"error", message:"Booking could not be saved"})
    }
}

app.post('/platinum', saveBooking)
app.post('/booking', saveBooking)

app.post('/message',async(req,res)=>{
    const{name,email,number,message}=req.body;
    try{
        const data={
            name,
            email,
            number,
            message
        }
        const savedMessage = await customerQqueryCollection.create(data)
        return res.status(201).json({status:"created", message:savedMessage})
    }catch(e){
        console.error("Failed to create message:", e);
        return res.status(500).json({status:"error", message:"Message could not be saved"})
    }
})
dbConnection
  .then(() => {
    app.listen(PORT,()=>{
      console.log("port connected");
    })
  })
  .catch(() => {
    process.exit(1);
  })



