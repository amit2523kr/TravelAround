import React from "react";
import './Footer.css';
import {BsInstagram} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';
import {GrTwitter} from 'react-icons/gr';
import {AiFillBehanceSquare} from 'react-icons/ai';
const Footer=()=>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>Travel</h1>
                    <p>Choose your favourite destination.</p>
                </div>
                <div>
                    <a href="https://www.instagram.com/">
                        <BsInstagram  className="icon"/>
                    </a>
                    <a href="https://www.facebook.com/">
                        <FaFacebookF  className="icon"/>
                    </a>
                    <a href="https://twitter.com/i/flow/login">
                        <GrTwitter  className="icon"/>
                    </a>
                    <a href="https://www.behance.net/">
                        <AiFillBehanceSquare  className="icon"/>
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <h4>GET IN TOUCH</h4>
                    <h6>Address</h6>
                    <a href="/">Pune Hinjewadi</a>
                    <a href="/">Cognizant phase 3</a>
                    <h4>Support Phone</h4>
                    <a href="/">+91-8978675</a>
                    <a href="/">Email:Worldtour@gmail.com</a> 
                </div>
                <div>
                    <h4>ABOUT US</h4>
                    <a href="/">How it works</a>
                    <a href="/">Start Planning</a>
                    <a href="/">Blog</a>
                    <a href="/">Reviews</a>
                    <a href="/">Trip Inspiration</a>
                    <a href="/">Contact Us</a>  
                </div>
                <div>
                    <h4>FROM THE Blog</h4>
                    <a href="/">Planning your trip</a>
                    <a href="/">Product Guides</a>
                    <a href="/">Destinations</a>
                    <a href="/">Tours</a> 
                </div>
            </div>
        </div>
    )
}
export default Footer;