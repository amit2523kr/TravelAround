import React, { useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./payment.css";
import hotel1 from "../assets/hotel1.jpeg";

const methods = [
  ["card", "💳", "Card"],
  ["upi", "📱", "UPI"],
  ["banking", "🏦", "Net Banking"],
  ["wallet", "👛", "Wallet"]
];

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const booking = useMemo(
    () => ({
      hotelName: state?.hotelName || "The Aurelia Grand",
      location: state?.location || "Paris, France",
      total: Number(state?.total || state?.price) || 1029,
      image: state?.image || hotel1,
      rating: state?.rating || "4.8",
      checkIn: state?.checkIn || "May 12, 2026",
      checkOut: state?.checkOut || "May 15, 2026",
      room: state?.room || "Executive Suite",
      guests: state?.guests || 2
    }),
    [state]
  );

  const hasValidBooking = Boolean(state?.bookingComplete);
  const [method, setMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "India",
    pin: "",
    address: ""
  });

  const formatCardNumber = (value) =>
    value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: name === "cardNumber" ? formatCardNumber(value) : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const maskedNumber = formData.cardNumber || "4242 4242 4242 4242";
  const cardName = formData.cardName || "YOUR NAME";
  const expiry = formData.expiry || "MM/YY";

  const validatePayment = () => {
    const nextErrors = {};

    if (!formData.cardName.trim()) nextErrors.cardName = "Required";
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) nextErrors.cardNumber = "Enter 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) nextErrors.expiry = "Use MM/YY";
    if (!/^\d{3,4}$/.test(formData.cvv)) nextErrors.cvv = "Enter 3 or 4 digits";
    if (!formData.country.trim()) nextErrors.country = "Required";
    if (!formData.pin.trim()) nextErrors.pin = "Required";
    if (!formData.address.trim()) nextErrors.address = "Required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!hasValidBooking || !validatePayment()) return;

    setIsPaying(true);
    const bookingId = `TRV-${Date.now()}`;
    const paymentPayload = {
      bookingId,
      hotelName: booking.hotelName,
      amountPaid: booking.total,
      email: state?.guest?.email || "guest@email.com",
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      room: booking.room,
      paidAt: new Date().toISOString()
    };
    try {
      await axios.post("http://localhost:8000/booking/", {
        ...paymentPayload,
        name: `${state?.guest?.firstName || ""} ${state?.guest?.lastName || ""}`.trim(),
        guests: booking.guests
      });
      localStorage.setItem("latestBooking", JSON.stringify(paymentPayload));
      await new Promise((resolve) => setTimeout(resolve, 900));
      navigate("/booking-success", { state: paymentPayload });
    } catch (error) {
      alert("Booking could not be saved. Please try again.");
      setIsPaying(false);
    }
  };

  if (!hasValidBooking) {
    return (
      <section className="lux-page payment-page">
        <div className="payment-missing lux-card">
          <p className="lux-eyebrow">✦ Booking Required</p>
          <h1 className="lux-title">Complete booking <em>details</em></h1>
          <p>Please fill the booking form before continuing to payment.</p>
          <button type="button" className="lux-btn-primary" onClick={() => navigate("/booking")}>Back To Booking</button>
        </div>
      </section>
    );
  }

  return (
    <section className="lux-page payment-page">
      <div className="lux-container payment-grid">
        <motion.main className="payment-main" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.12 }}>
          <header>
            <p className="lux-eyebrow">✦ Step 3 of 3</p>
            <h1 className="lux-title">Secure <em>payment</em></h1>
            <p>Confirm your stay with encrypted checkout and instant booking confirmation.</p>
          </header>

          <div className="method-grid">
            {methods.map(([id, icon, label]) => (
              <button key={id} type="button" className={`method-card ${method === id ? "active" : ""}`} onClick={() => setMethod(id)}>
                <span>{icon}</span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>

          {method === "card" ? (
            <div className="credit-visual">
              <div className="chip" />
              <p className="card-number">{maskedNumber}</p>
              <div>
                <span>{cardName}</span>
                <span>{expiry}</span>
              </div>
              <strong>VISA</strong>
            </div>
          ) : null}

          <form className="payment-form" onSubmit={handleSubmit}>
            <section className="payment-section lux-card">
              <h2>Card Details</h2>
              <label className="lux-label">Name On Card<input className="lux-input" name="cardName" value={formData.cardName} onChange={handleChange} placeholder="Amit Kumar" />{errors.cardName ? <span className="field-error">{errors.cardName}</span> : null}</label>
              <label className="lux-label">Card Number<input className="lux-input" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" maxLength="19" />{errors.cardNumber ? <span className="field-error">{errors.cardNumber}</span> : null}</label>
              <div className="split-inputs">
                <label className="lux-label">Expiry MM/YY<input className="lux-input" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="08/29" maxLength="5" />{errors.expiry ? <span className="field-error">{errors.expiry}</span> : null}</label>
                <label className="lux-label">CVV<input className="lux-input" type="password" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="4" />{errors.cvv ? <span className="field-error">{errors.cvv}</span> : null}</label>
              </div>
            </section>

            <section className="payment-section lux-card">
              <h2>Billing Address</h2>
              <div className="split-inputs">
                <label className="lux-label">Country<select className="lux-select" name="country" value={formData.country} onChange={handleChange}><option>India</option><option>United States</option><option>France</option></select>{errors.country ? <span className="field-error">{errors.country}</span> : null}</label>
                <label className="lux-label">PIN Code<input className="lux-input" name="pin" value={formData.pin} onChange={handleChange} placeholder="411057" />{errors.pin ? <span className="field-error">{errors.pin}</span> : null}</label>
              </div>
              <label className="lux-label">Street Address<input className="lux-input" name="address" value={formData.address} onChange={handleChange} placeholder="Apartment, street, locality" />{errors.address ? <span className="field-error">{errors.address}</span> : null}</label>
            </section>

            <button type="submit" className="lux-btn-primary confirm-pay" disabled={isPaying}>
              {isPaying ? "Processing..." : `Confirm & Pay $${booking.total} →`}
            </button>
            <p className="payment-lock">🔒 Your card details are encrypted and never stored.</p>
          </form>
        </motion.main>

        <motion.aside className="order-summary lux-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}>
          <div className="order-hotel">
            <img src={booking.image} alt={booking.hotelName} />
            <div>
              <h2>{booking.hotelName}</h2>
              <p>{booking.location}</p>
              <p className="summary-stars">★★★★★ <span>{booking.rating}</span></p>
            </div>
          </div>
          <div className="summary-row"><span>Check-In</span><strong>{booking.checkIn}</strong></div>
          <div className="summary-row"><span>Check-Out</span><strong>{booking.checkOut}</strong></div>
          <div className="summary-row"><span>Duration</span><strong>3 nights</strong></div>
          <div className="summary-row"><span>Room</span><strong>{booking.room}</strong></div>
          <div className="summary-row"><span>Guests</span><strong>{booking.guests}</strong></div>
          <div className="summary-row"><span>Subtotal</span><strong>${booking.total - 84}</strong></div>
          <div className="summary-row"><span>Taxes</span><strong>$84</strong></div>
          <div className="summary-row total"><span>Total</span><strong>${booking.total}</strong></div>
          <p className="badges">🔒 SSL · ✅ Instant · 🔄 Free Cancel</p>
        </motion.aside>
      </div>
    </section>
  );
};

export default Payment;
