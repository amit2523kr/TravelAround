import React from "react";
import TripData from "./TripData";
import london  from "../assets/tower.jpeg";
import santorini from "../assets/santorini.jpg";
import taj from "../assets/taj.jpg";
import eiffel from "../assets/eiffel.jpg"
import newyork from "../assets/newYork.jpeg";
import lotustemple from "../assets/lotustemple.jpeg";
import liberty from "../assets/unity.jpeg"
import image from "../assets/image1.jpg";
const Trip=()=>{
    return(
        <>
        <div className="trip">
            <h1>Recent Trips</h1>
            <p>You can discover unique destination across world.</p>
            <div className="tripcard">
                <TripData
                imgSrc={taj}
                heading="Trip to Agra"
                text="Embarking on a Taj Mahal trip is a captivating journey through history, culture, and the breathtaking allure of one of the world's most iconic landmarks."
                />
                <TripData
                imgSrc={eiffel}
                heading="Trip to Eiffel Tower"
                text=" Eiffel Tower is an enchanting adventure that unveils the allure of Paris, where timeless beauty and breathtaking views come together in a single majestic structure."
                />
                <TripData
                imgSrc={santorini}
                heading="Trip to Santorini"
                text="Santorini is a dreamlike escape to a picturesque Greek paradise, where whitewashed buildings, stunning sunsets, and azure waters create an unforgettable experience."
                />
                 <TripData
                imgSrc={london}
                heading="Trip to Italy"
                text="
                An Italy trip is a sensory journey through captivating history, art, mouthwatering cuisine, and stunning landscapes, where every moment feels like a masterpiece."
                />
            </div>
            <div className="tripcard">
                <TripData
                imgSrc={image}
                heading="Trip to Australia"
                text="Australia beckons with its captivating blend of natural wonders, vibrant cities, and laid-back charm, promising an unforgettable journey Down Under."
                />
                <TripData
                imgSrc={lotustemple}
                heading="Trip to Delhi"
                text="A Lotus Temple trip is a serene and contemplative experience, where the architectural beauty and tranquil atmosphere blend harmoniously to inspire inner peace and reflection."
                />
                <TripData
                imgSrc={liberty}
                heading="Trip to Statue of Liberty"
                text="A Statue of Liberty trip is an iconic American adventure, where history, freedom, and awe-inspiring views converge on Liberty Island to create a truly memorable experience."
                />
                 <TripData
                imgSrc={newyork}
                heading="Trip to NewYork"
                text="A New York trip offers you a vibrant blend of diverse cultures, iconic landmarks, and endless possibilities that make it an exhilarating experience."
                />
            </div>
        </div>
        </>
    )
}
export default Trip;