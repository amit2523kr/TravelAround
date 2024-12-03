import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";
import "../usersignin/signin.css";
const Signup=()=>{
    const history = useNavigate();
    const[fname,setFname]=useState('');
    const[lname,setLname]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    async function submit(e){
        e.preventDefault();
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            await axios.post("http://localhost:8000/signup/",{
                fname,lname,email,password:hashedPassword
            })
            .then(res=>{
                if(res.data ==="exist"){
                    alert("User already exist");
                }else if(res.data ==="donot exist"){
                   history("/login");
                }
            })
            .catch(e=>{
                alert("wrong details");
                console.log(e);
            })
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div id="container" className="container-fluid py-3 box" >
            <div id="row" className="row">
                <div className="col-md-5 col-sm-6 col-xs-6  ">
                <h3 className="mt-5 mx-5 text-white"><i>Hotel Arena</i></h3>
                <p className="mx-4 mt-5 text-white">welcome to our Trip.Book now!</p>
                <form action="/signup" method="post">
                <div className="row">
                    <div className="col-md-6">
                    <input className="form-control mt-3" type="text" onChange={(e)=>{setFname(e.target.value)}} placeholder="First Name" required/>
                    </div>
                    <div className="col-md-6">
                    <input className="form-control mt-3 " type="text" onChange={(e)=>{setLname(e.target.value)}} placeholder="Last Name" required/>
                    </div>
                </div>
                    <input className="form-control mt-3" type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" required/>
                    <input  className="form-control mt-3"  type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" required/>
                    <input id="submit_btn" className=" button bg-primary text-white" type="submit" onClick={submit} />
                </form>
                <br />
                <p className="or text-white">OR</p>
                <br />
                <a id="submit_btn" className="login text-white" href="/login">Login page</a>
            </div>
        </div>
        </div>
    )
}
export default Signup;
