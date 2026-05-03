import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = ({ price, hotelName }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/payment", {
      state: {
        price,
        hotelName
      }
    });
  };

  return (
    <button type="button" className="book" onClick={handleBookNow}>
      Book Now
    </button>
  );
};

export default BookingForm;
