import React from "react";
import {HotelData} from './HotelData';
import Popupform from './Popupform';
import { useCookies } from "react-cookie";
import {MdLocationPin} from 'react-icons/md';
import "./economy.css";
const EconomyClass=()=>{
    const [cookies] = useCookies(["selectedCountry", "selectedState", "selectedCity"]);

    return(
        <div>
            <h2 id="head">Welcome to the  Economy Class.</h2>
            <p  id="para">Book your ticket for beautiful trip</p>
        {HotelData.map((item,index) =>{
            return(
                <>
                <div className="hotelbox">
                <div className="image">
                <img src={item.pic} alt="" className="siImg" />
                </div>
                 <div className="content">
                <h3 className="">{item.name}</h3>
                <p className="location_details"><MdLocationPin /> {cookies.selectedCity},{cookies.selectedState},{cookies.selectedCountry} </p>
                <p className="">
                Studio Apartment with Air conditioning
                </p>
                <p className="">{item.desc}</p>
                <p className="text">Free cancellation </p>
                <p className="text">
                You can cancel later, so lock in this great price today!
                </p> 
                </div>
                <div className="bookingstat">
                    <p>${item.price}</p>
                    <p>inludes taxes</p>
                    <Popupform  price={item.price}/>
                </div>
               
                </div>
               
                </>
            );
        })}
         
      
   </div>
      
    )
}
export default EconomyClass;