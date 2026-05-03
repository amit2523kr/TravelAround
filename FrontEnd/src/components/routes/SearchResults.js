import React, { useMemo, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./searchResults.css";
import hotel1 from "../assets/hotel1.jpeg";
import hotel2 from "../assets/hotel2.jpeg";
import hotel3 from "../assets/hotel3.jpeg";
import hotel4 from "../assets/hotel4.jpeg";
import hotel5 from "../assets/hotel5.jpeg";
import hotel6 from "../assets/hotel6.jpeg";

const localImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6];
const amenities = ["Boardroom", "Spa", "Airport Transfer", "Fine Dining", "Concierge"];

const SearchResults = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [resultMode, setResultMode] = useState("hotels");
  const [searchTerm, setSearchTerm] = useState(state?.query || "");
  const [filters, setFilters] = useState({ meetings: true, suites: false, breakfast: true });

  const allResults = useMemo(() => (Array.isArray(state?.allResults) ? state.allResults : []), [state]);
  const hotelResults = useMemo(() => (Array.isArray(state?.hotelResults) ? state.hotelResults : []), [state]);
  const resultsToShow = resultMode === "all" ? allResults : hotelResults.length ? hotelResults : allResults;

  const derivePrice = (hotel, index) => {
    const latBoost = Number(hotel?.coordinates?.lat || 0);
    return 195 + (index % 6) * 48 + (Math.abs(Math.floor(latBoost)) % 12);
  };

  const createHotelPayload = (hotel, index) => {
    const price = derivePrice(hotel, index);
    return {
      hotelName: hotel?.regionNames?.primaryDisplayName || "The Aurelia Grand",
      location: hotel?.regionNames?.displayName || hotel?.hotelAddress?.city || "Location unavailable",
      type: hotel?.type || "Luxury Stay",
      price,
      image: localImages[index % localImages.length],
      rating: (4.6 + (index % 4) / 10).toFixed(1)
    };
  };

  const handleBookNow = (hotel, index) => {
    const payload = createHotelPayload(hotel, index);
    Cookies.set("selectedCountry", hotel?.hierarchyInfo?.country?.name || "");
    Cookies.set("selectedState", hotel?.regionNames?.secondaryDisplayName || hotel?.hotelAddress?.city || "");
    Cookies.set("selectedCity", hotel?.hotelAddress?.city || hotel?.regionNames?.primaryDisplayName || "");
    navigate("/booking", { state: payload });
  };

  if (!allResults.length) {
    return (
      <section className="lux-page results-page">
        <div className="results-empty lux-card reveal">
          <p className="lux-eyebrow">✦ Browse</p>
          <h2 className="lux-title">No stays <em>found</em></h2>
          <p>Search hotels from the home page first.</p>
          <button type="button" className="lux-btn-primary" onClick={() => navigate("/")}>Go To Home</button>
        </div>
      </section>
    );
  }

  return (
    <section className="lux-page browse-page">
      <div className="browse-topbar">
        <input className="browse-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search destination, hotel, or meeting space" />
        <button type="button" className="lux-btn-primary">Search</button>
        <span className="topbar-spacer" />
        <button type="button" className={`filter-toggle ${resultMode === "hotels" ? "active" : ""}`} onClick={() => setResultMode("hotels")}>Filter A</button>
        <button type="button" className={`filter-toggle ${resultMode === "all" ? "active" : ""}`} onClick={() => setResultMode("all")}>Filter B</button>
      </div>

      <div className="browse-layout">
        <motion.aside className="filters-panel" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className="lux-eyebrow">✦ Refine</p>
          <div className="filter-group">
            <h3>Stay Type</h3>
            {Object.entries(filters).map(([key, value]) => (
              <label key={key}>
                <input type="checkbox" checked={value} onChange={() => setFilters((prev) => ({ ...prev, [key]: !prev[key] }))} />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h3>Price Range</h3>
            <input type="range" min="150" max="750" defaultValue="420" />
          </div>
          <div className="filter-group">
            <h3>Occasion</h3>
            <label><input type="checkbox" defaultChecked /> Board meeting</label>
            <label><input type="checkbox" /> Retreat</label>
            <label><input type="checkbox" defaultChecked /> Weekend stay</label>
          </div>
          <button type="button" className="lux-btn-ghost apply-btn">Apply Filters</button>
        </motion.aside>

        <motion.main className="results-main" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut", delayChildren: 0.12, staggerChildren: 0.12 }}>
          <header className="results-title-row">
            <div>
              <p className="lux-eyebrow">✦ Curated Results</p>
              <h1 className="lux-title">Hotels for <em>{state?.query || "your search"}</em></h1>
              <p>{resultsToShow.length} refined properties available</p>
            </div>
            <select className="sort-select" defaultValue="recommended">
              <option value="recommended">Recommended</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </header>

          <div className="hotel-results">
            {resultsToShow.map((hotel, index) => {
              const payload = createHotelPayload(hotel, index);
              return (
                <motion.article className="hotel-card" key={`${hotel?.hotelId || hotel?.gaiaId || "result"}-${index}`} onClick={() => handleBookNow(hotel, index)} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: "easeOut", delay: (index % 4) * 0.12 }}>
                  <div className="hotel-media">
                    <img src={payload.image} alt={payload.hotelName} loading="lazy" />
                    <span className="lux-pill media-badge">{payload.type}</span>
                  </div>
                  <div className="hotel-card-content">
                    <h3>{payload.hotelName}</h3>
                    <p className="hotel-location">📍 {payload.location}</p>
                    <p className="hotel-rating">★★★★★ <span>{payload.rating}</span></p>
                    <div className="amenities">
                      {amenities.slice(0, 3 + (index % 2)).map((item) => <span className="lux-pill" key={item}>{item}</span>)}
                    </div>
                    <div className="card-bottom">
                      <p className="hotel-price">${payload.price}<span> / night</span></p>
                      <button type="button" className="book-now-btn" onClick={(event) => { event.stopPropagation(); handleBookNow(hotel, index); }}>Book Now</button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.main>
      </div>
    </section>
  );
};

export default SearchResults;
