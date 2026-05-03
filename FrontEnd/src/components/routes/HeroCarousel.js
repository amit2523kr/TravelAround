import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./heroCarousel.css";

const HeroCarousel = ({ slides }) => {
  const safeSlides = useMemo(() => (Array.isArray(slides) ? slides.filter(Boolean) : []), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, 4500);
    return () => clearInterval(intervalId);
  }, [safeSlides.length]);

  if (!safeSlides.length) return null;
  const active = safeSlides[activeIndex];

  return (
    <header className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${active.image})` }} />
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-kicker">{active.kicker}</p>
        <h1 className="hero-title">{active.title}</h1>
        <p className="hero-subtitle">{active.subtitle}</p>

        <div className="hero-actions">
          <Link to="/" className="hero-btn primary">
            Explore Trips
          </Link>
          <Link to="/signup" className="hero-btn secondary">
            Start Planning
          </Link>
        </div>

        <div className="hero-dots" aria-label="carousel dots">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeroCarousel;
