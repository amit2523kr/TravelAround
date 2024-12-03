import React from 'react';
import TripData from '../card/TripData';
import room1 from "../assets/room1.jpg";
import room2 from "../assets/room2.jpg";
import room3 from "../assets/room3.jpg";
import room4 from "../assets/room4.jpg";
import chauffer from "../assets/chauffer.jpg";
import cabservice from '../assets/cabservice.jpg';
import olaservice from '../assets/olaservice.jpg';
import uberservice from '../assets/uberservice.jpg';
import '../routes/service.css';
const Service=()=>{
   return(
       <>
        <div className="trip">
        <h2 >Our services for our customer.</h2>
        <h3 className='heading'>Luxurious Hotels to stay!</h3>
       <div className="tripcard">
            <TripData
                    imgSrc={room1}
                    heading="Double Room"
            />
            <TripData
                imgSrc={room2}
                heading="Presidential Suite"
           />
           <TripData
                imgSrc={room3}
                heading="Room with lounge"
            />   
            <TripData
                imgSrc={room4}
                heading="Executive Suite"
            />      
            </div>
            <h3 className='heading'>Cabs At your doorstep!</h3>
            <div className="tripcard">
            <TripData
                    imgSrc={chauffer}
                    heading="Chauffers"
                  
            />
            <TripData
                imgSrc={cabservice}
                heading="Minibuses"
              
           />
           <TripData
                imgSrc={olaservice}
                heading="Ola Cabs"
            />   
            <TripData
                imgSrc={uberservice}
                heading="Uber Drivers"
            />      
            </div>
            </div>
       </>
   )
}
export default  Service;