import React from 'react';
import Travel from '../Travel';
import Trip from '../card/Trip';
import Review from '../customerReview/Review';
import ourimage from "../assets/tour.jpg";
import home from "../assets/home.png";
import Book from '../Booking/Book';
import Service from './Service';
import Form from '../Form/Form';
import "../routes/Home.css";
import { useNavigate } from 'react-router-dom';
 const Home=()=>{
    const history=useNavigate();
    const Submit=()=>{
        history('/signup');
    }
    return(
        <>
        <Travel 
        cName="img"
        title="Your Journey Begins Here."
        imgSrc={home}
        desc="Book your journey now with exciting offers"
        url="/"
        />
        <Book />
        <Trip />
        <Service />
        <Review />
        <Form />
        <div>
            <img src={ourimage} alt="trip_plan" />
            <div className='experience'>
                <h2>TRUE VALUE FOR EXPERIENCE</h2>
                <p>Relax and Enjoy your journey you are with us.</p>
                <button  onClick={Submit} className='button1'>Start Planning</button>
            </div>
        </div>
        </>
    )
 }
 export default  Home;