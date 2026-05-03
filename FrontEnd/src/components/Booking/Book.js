import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./Book.css";
import hotel1 from "../assets/hotel1.jpeg";

const rows = [
  ["Check-In", "May 12, 2026"],
  ["Check-Out", "May 15, 2026"],
  ["Nights", "3"],
  ["Room", "Executive Suite"],
  ["Rate", "$315 / night"],
  ["Taxes", "$84"]
];

const Book = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hotel = useMemo(
    () => ({
      hotelName: state?.hotelName || "The Aurelia Grand",
      location: state?.location || "Paris, France",
      price: Number(state?.price) || 315,
      image: state?.image || hotel1,
      rating: state?.rating || "4.8"
    }),
    [state]
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    bedType: ""
  });
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [errors, setErrors] = useState({});
  const total = hotel.price * 3 + 84;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const updateGuest = (key, amount) => {
    setGuests((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + amount) }));
  };

  const validateBooking = () => {
    const nextErrors = {};
    const requiredFields = ["firstName", "lastName", "email", "phone", "checkIn", "checkOut", "roomType", "bedType"];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) nextErrors[field] = "Required";
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (formData.phone && formData.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid phone number";
    }

    if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      nextErrors.checkOut = "Check-out must be after check-in";
    }

    if (guests.adults + guests.children + guests.infants < 1) {
      nextErrors.guests = "Add at least one guest";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const proceed = () => {
    if (!validateBooking()) return;

    navigate("/payment", {
      state: {
        ...hotel,
        total,
        guests: guests.adults + guests.children + guests.infants,
        room: formData.roomType,
        bedType: formData.bedType,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guest: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests
        },
        bookingComplete: true
      }
    });
  };

  return (
    <section className="lux-page booking-detail">
      <div className="lux-container booking-grid">
        <motion.main className="booking-main" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.12 }}>
          <header>
            <p className="lux-eyebrow">✦ Step 2 of 3</p>
            <h1 className="lux-title">Complete your <em>booking</em></h1>
          </header>

          <section className="booking-section lux-card">
            <h2>Guest Information</h2>
            <div className="form-grid two">
              <label className="lux-label">First Name<input className="lux-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Amit" />{errors.firstName ? <span className="field-error">{errors.firstName}</span> : null}</label>
              <label className="lux-label">Last Name<input className="lux-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Kumar" />{errors.lastName ? <span className="field-error">{errors.lastName}</span> : null}</label>
              <label className="lux-label">Email<input className="lux-input" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="name@email.com" />{errors.email ? <span className="field-error">{errors.email}</span> : null}</label>
              <label className="lux-label">Phone<input className="lux-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />{errors.phone ? <span className="field-error">{errors.phone}</span> : null}</label>
            </div>
            <label className="lux-label">Special Requests<textarea className="lux-textarea" name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" placeholder="Arrival notes, meeting needs, dietary preferences" /></label>
          </section>

          <section className="booking-section lux-card">
            <h2>Stay Dates</h2>
            <div className="form-grid two">
              <label className="lux-label">Check-In<input className="lux-input" name="checkIn" value={formData.checkIn} onChange={handleChange} type="date" />{errors.checkIn ? <span className="field-error">{errors.checkIn}</span> : null}</label>
              <label className="lux-label">Check-Out<input className="lux-input" name="checkOut" value={formData.checkOut} onChange={handleChange} type="date" />{errors.checkOut ? <span className="field-error">{errors.checkOut}</span> : null}</label>
            </div>
          </section>

          <section className="booking-section lux-card">
            <h2>Guests</h2>
            {[
              ["adults", "Adults", "Ages 13 and above"],
              ["children", "Children", "Ages 2 to 12"],
              ["infants", "Infants", "Under 2"]
            ].map(([key, label, sub]) => (
              <div className="guest-row" key={key}>
                <div>
                  <strong>{label}</strong>
                  <span>{sub}</span>
                </div>
                <div className="counter">
                  <button type="button" onClick={() => updateGuest(key, -1)}>−</button>
                  <span>{guests[key]}</span>
                  <button type="button" onClick={() => updateGuest(key, 1)}>+</button>
                </div>
              </div>
            ))}
            {errors.guests ? <p className="form-alert">{errors.guests}</p> : null}
          </section>

          <section className="booking-section lux-card">
            <h2>Room Preference</h2>
            <div className="form-grid two">
              <label className="lux-label">Room Type<select className="lux-select" name="roomType" value={formData.roomType} onChange={handleChange}><option value="">Select room</option><option value="Executive Suite">Executive Suite</option><option value="Premier Room">Premier Room</option></select>{errors.roomType ? <span className="field-error">{errors.roomType}</span> : null}</label>
              <label className="lux-label">Bed Type<select className="lux-select" name="bedType" value={formData.bedType} onChange={handleChange}><option value="">Select bed</option><option value="King Bed">King Bed</option><option value="Twin Beds">Twin Beds</option></select>{errors.bedType ? <span className="field-error">{errors.bedType}</span> : null}</label>
            </div>
          </section>
        </motion.main>

        <motion.aside className="summary-card lux-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}>
          <img src={hotel.image} alt={hotel.hotelName} />
          <div className="summary-body">
            <h2>{hotel.hotelName}</h2>
            <p>📍 {hotel.location}</p>
            <p className="summary-stars">★★★★★ <span>{hotel.rating}</span></p>
            {rows.map(([label, value]) => {
              const liveValue = label === "Check-In" ? formData.checkIn || "Not selected" : label === "Check-Out" ? formData.checkOut || "Not selected" : label === "Room" ? formData.roomType || "Not selected" : value;
              return <div className="summary-row" key={label}><span>{label}</span><strong>{liveValue}</strong></div>;
            })}
            <div className="summary-row total"><span>Total</span><strong>${total}</strong></div>
            <button type="button" className="lux-btn-primary summary-submit" onClick={proceed}>Proceed to Payment →</button>
            <p className="secure-note">🔒 Secure checkout · Free cancellation until 48 hours before arrival.</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Book;
