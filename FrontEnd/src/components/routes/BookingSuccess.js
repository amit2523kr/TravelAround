import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookingSuccess.css";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const latestBooking = state || JSON.parse(localStorage.getItem("latestBooking") || "{}");

  if (!latestBooking?.bookingId) {
    return (
      <div className="lux-page success-wrapper">
        <motion.div className="success-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <h2 className="lux-title">No booking <em>found</em></h2>
          <p>Please complete a booking first.</p>
          <button type="button" className="lux-btn-primary" onClick={() => navigate("/search-results")}>Browse Stays</button>
        </motion.div>
      </div>
    );
  }

  const rows = [
    ["Booking ID", latestBooking.bookingId, "mono"],
    ["Hotel", latestBooking.hotelName],
    ["Check-In", latestBooking.checkIn || "May 12, 2026"],
    ["Check-Out", latestBooking.checkOut || "May 15, 2026"],
    ["Room", latestBooking.room || "Executive Suite"],
    ["Amount Paid", `$${latestBooking.amountPaid}`, "amount"],
    ["Email", latestBooking.email || "guest@email.com"]
  ];

  return (
    <div className="lux-page success-wrapper">
      <motion.div className="success-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <div className="success-strip" />
        <div className="success-top">
          <div className="check-mark">✓</div>
          <p className="success-eyebrow">✦ Payment Successful</p>
          <h1 className="lux-title">Booking <em>Confirmed!</em></h1>
          <p>Your confirmation has been reserved and sent to your email.</p>
        </div>

        <div className="booking-meta">
          {rows.map(([label, value, kind]) => (
            <div className="detail-row" key={label}>
              <span>{label}</span>
              <strong className={kind || ""}>{value}</strong>
            </div>
          ))}
        </div>

        <div className="success-actions">
          <button type="button" className="lux-btn-primary" onClick={() => navigate("/search-results")}>Plan Another Trip →</button>
          <button type="button" className="lux-btn-ghost">Download Receipt</button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
