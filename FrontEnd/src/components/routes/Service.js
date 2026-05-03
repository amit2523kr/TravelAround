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
import useInView from '../utils/useInView';
const Service=()=>{
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.08 });
   return(
       <>
        <div className="trip modern-section service-section" ref={sectionRef}>
        <div className="section-head">
          <div>
            <h1>Our Services</h1>
            <p>Everything you need for a smooth trip — stays, rides, and support.</p>
          </div>
        </div>
        <div className={`service-grid ${isInView ? "reveal" : ""}`}>
          <article className="service-tile">
            <div className="service-icon">🏨</div>
            <h3>Premium stays</h3>
            <p>Handpicked rooms and suites with flexible options.</p>
          </article>
          <article className="service-tile">
            <div className="service-icon">🚕</div>
            <h3>Doorstep rides</h3>
            <p>Airport pickups and local cabs at your schedule.</p>
          </article>
          <article className="service-tile">
            <div className="service-icon">🧾</div>
            <h3>Fast checkout</h3>
            <p>Simple payment flow with instant confirmation.</p>
          </article>
          <article className="service-tile">
            <div className="service-icon">🛟</div>
            <h3>Trip support</h3>
            <p>Help when you need it — before and after booking.</p>
          </article>
        </div>

        <h3 className='heading'>Featured stays</h3>
        <div className="tripcard carousel-row">
          <TripData imgSrc={room1} heading="Double Room" delay="0ms" reveal={isInView} />
          <TripData imgSrc={room2} heading="Presidential Suite" delay="80ms" reveal={isInView} />
          <TripData imgSrc={room3} heading="Room with lounge" delay="160ms" reveal={isInView} />
          <TripData imgSrc={room4} heading="Executive Suite" delay="240ms" reveal={isInView} />
        </div>

        <h3 className='heading'>Featured rides</h3>
        <div className="tripcard carousel-row">
          <TripData imgSrc={chauffer} heading="Chauffeurs" delay="0ms" reveal={isInView} />
          <TripData imgSrc={cabservice} heading="Minibuses" delay="80ms" reveal={isInView} />
          <TripData imgSrc={olaservice} heading="Ola Cabs" delay="160ms" reveal={isInView} />
          <TripData imgSrc={uberservice} heading="Uber Drivers" delay="240ms" reveal={isInView} />
        </div>
            </div>
       </>
   )
}
export default  Service;