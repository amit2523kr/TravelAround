import React from 'react';
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./Book.css";
const Book=()=>{
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const[option,setOption]=useState("");
    const history=useNavigate();
    useEffect(() => {
      console.log(selectedCountry);
      console.log(selectedCountry?.isoCode);
      console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
    }, [selectedCountry]);
const handleOptionChange=(e)=>{
    setOption(e.target.value);
};
const submit = () => {
  if (option === "Platinumclass") {
    Cookies.set("selectedCountry", selectedCountry?.name);
    Cookies.set("selectedState", selectedState?.name);
    Cookies.set("selectedCity", selectedCity?.name);
    history("/platinum");
  } else if (option === "Comfortclass") {
    Cookies.set("selectedCountry", selectedCountry?.name);
    Cookies.set("selectedState", selectedState?.name);
    Cookies.set("selectedCity", selectedCity?.name);
    history("/comfort");
  } else if (option === "economyclass") {
    Cookies.set("selectedCountry", selectedCountry?.name);
    Cookies.set("selectedState", selectedState?.name);
    Cookies.set("selectedCity", selectedCity?.name);
    history("/economy");
  }
};

    return(
        <form>
        <div className="container box cont">
        <div className="row p-4 booking " >
        <div className='col-md-3 '>
            <label>Select country</label>
            <Select 
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
          Cookies.set("selectedCountry", item?.name);
          setSelectedState(null);
          setSelectedCity(null);
        }}
      />
        </div>
        <div className='col-md-3'>
            <label>Select State</label>
            <Select  className="select "
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
          Cookies.set("selectedState", item?.name);
          setSelectedCity(null);
        }}
      />
        </div>
        <div className='col-md-2'>
            <label>City</label>
            <Select 
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
          Cookies.set("selectedCity", item?.name);
        }}
      />     
        </div>
        <div className='col-md-2 '>
            <label>Price Range</label>
            <select value={option} onChange={handleOptionChange} className="form-select">
                <option value="">Select--</option>
                <option value="Platinumclass">Platinum class</option>
                <option value="Comfortclass">Comfort class</option>
                <option value="economyclass">Economy class</option>
            </select>
        </div>
        <div className='col-md-2 mt-2'>
            <button type='submit' id="search_button" onClick={submit} className='bg-dark text-white my-4 ' >Search</button>
        </div>
        </div>
    </div> 
    </form>
    )
}
export default Book;
