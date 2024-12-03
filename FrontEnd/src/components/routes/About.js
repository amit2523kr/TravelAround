import React from 'react';
import Travel from '../Travel';
import image from "../assets/image1.jpg";
import "../routes/Home.css";
const About=()=>{
   return(
       <>
       <Travel 
       cName="img-mid"
       title="Your Journey Begins Here."
       imgSrc={image}
       desc="Book your journey now with exciting offers"
       btnClass="hide"
       />
       <div className='container mt-5 mb-5'>
        <div className='row'>
            <div className='col col-md-6'>
                <h1>Our Goal</h1>
                <p className='fs-5'>Welcome to our travel website, where adventure and exploration meet convenience and ease. Our goal is to provide you with the most comprehensive and up-to-date information on travel destinations around the world.</p>
                <p className='fs-5'>On our website, you'll find a wide variety of travel resources, including destination guides, travel tips, hotel and flight booking services, and much more.We understand that every traveler is unique, which is why we strive to provide personalized travel recommendations based on your interests, preferences, and budget. </p>
            </div>
            <div className='col-md-6'>
                <img className='img' src={image} alt="about" />
            </div>
        </div>
       </div>
       </>
   )
}
export default  About;