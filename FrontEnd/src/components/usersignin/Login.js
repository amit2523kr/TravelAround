import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../usersignin/signin.css";
const Login=(props)=>{
    const history = useNavigate();
    const[email,setEmail]=useState('');
    const[isLoggedIn,setIsLoggedIn]=useState("");
    const[password,setPassword]=useState('');
    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/login/",{
                email,password
            })
            .then(res=>{
                if(res.data ==="exist"){
                    props.setIsLoggedIn(true);
                    history("/")
                }else if(res.data ==="donot exist"){
                   alert("User has not signed up or wrong password");
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
        <div id="container" className="container-fluid  py-3 box" >
        <div id="row" className="row">
            <div className="col-md-5 col-sm-6 col-xs-6  ">
            <h3 className="mt-5 mx-5 text-white"><i>Tour Arena</i></h3>
            
            <p className="mx-4 mt-5 text-white">welcome to our Trip.Book now!</p>
            <form action="/signup" method="post">
                <input className="form-control mt-5" type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" required/>
                <input  className="form-control mt-3"  type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"  required/>
                <input id="submit_btn" className=" button bg-primary text-white" type="submit" onClick={submit} />
            </form>
            <br />
            <p className="or text-white">OR</p>
            <br />
            <a id="submit_btn" className="login text-white" href="/signup">Signup page</a>
        </div>
    </div>
    </div>
    )
}
export default Login;