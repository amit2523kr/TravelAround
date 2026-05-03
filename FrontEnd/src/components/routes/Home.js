import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiArrowRight,
  FiMapPin,
  FiMail,
  FiPhone,
  FiCompass,
  FiShield,
  FiHeadphones,
  FiStar
} from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import "./Home.css";
import { Reveal } from "../utils/Reveal";
import { searchHotelRegions, toHotelSearchState } from "../utils/hotelRegionsApi";
import taj from "../assets/taj.jpg";
import eiffel from "../assets/eiffel.jpg";
import santorini from "../assets/santorini.jpg";
import tower from "../assets/tower.jpeg";
import newYork from "../assets/newYork.jpeg";
import beach from "../assets/beach.jpg";
import unity from "../assets/unity.jpeg";
import lotustemple from "../assets/lotustemple.jpeg";

const UNSPLASH = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO_BG = UNSPLASH("photo-1469854523086-cc02fe5d8800", 1920);

const RECENT_TRIPS = [
  {
    country: "Italy",
    name: "Amalfi Coast",
    searchQuery: "Amalfi Coast",
    desc: "Cliffside villages, turquoise water, and slow evenings overlooking the Tyrrhenian Sea.",
    price: "From $2,450",
    img: beach
  },
  {
    country: "Japan",
    name: "Kyoto in Bloom",
    searchQuery: "Kyoto",
    desc: "Temple gardens, tea houses, and timeless streets away from the crowds.",
    price: "From $3,120",
    img: lotustemple
  },
  {
    country: "Greece",
    name: "Santorini Sunsets",
    searchQuery: "Santorini",
    desc: "Whitewashed suites, caldera views, and golden hours you will not forget.",
    price: "From $2,890",
    img: santorini
  },
  {
    country: "Iceland",
    name: "Ring Road Escape",
    searchQuery: "Iceland",
    desc: "Waterfalls, black-sand beaches, and quiet luxury lodges under the aurora.",
    price: "From $3,540",
    img: tower
  },
  {
    country: "France",
    name: "Parisian Week",
    searchQuery: "Paris",
    desc: "Private river cruises, atelier visits, and suites steps from the Marais.",
    price: "From $2,680",
    img: eiffel
  },
  {
    country: "Morocco",
    name: "Marrakech Riads",
    searchQuery: "Marrakech",
    desc: "Courtyard pools, spice markets, and desert camps styled for comfort.",
    price: "From $2,210",
    img: taj
  },
   {
    country: "Switzerland",
    name: "Alpine Rail",
    searchQuery: "Switzerland",
    desc: "Panoramic trains, lakefront chalets, and crisp air at every turn.",
    price: "From $3,980",
    img: unity
  },
  {
    country: "Maldives",
    name: "Overwater Quiet",
    searchQuery: "Maldives",
    desc: "Private decks, house reef snorkeling, and breakfasts above the tide.",
    price: "From $4,200",
    img: newYork
  }
];

const handleTripImageError = (event) => {
  event.currentTarget.src = beach;
};

const SERVICES = [
  {
    icon: <FiCompass />,
    title: "Curated Journeys",
    text: "Itineraries shaped around your pace, with vetted guides and seamless transfers."
  },
  {
    icon: <FiStar />,
    title: "Preferred Stays",
    text: "Partner rates at boutique hotels, villas, and lodges we inspect in person."
  },
  {
    icon: <FiShield />,
    title: "Travel Assurance",
    text: "24/7 support, flexible rebooking options, and transparent policies."
  },
  {
    icon: <FiHeadphones />,
    title: "Concierge Desk",
    text: "Restaurant holds, surprise celebrations, and on-trip tweaks handled quietly."
  }
];

const FEATURED = {
  stays: {
    hero: {
      eyebrow: "✦ Private Villa",
      name: "Lake Como Retreat",
      price: "From $890 / night",
      img: UNSPLASH("photo-1566073771259-6a8506099945", 900)
    },
    tiles: [
      {
        eyebrow: "✦ Boutique",
        name: "Lisbon Rooftop",
        price: "From $320 / night",
        img: UNSPLASH("photo-1551882547-ff40c63fe5fa", 600),
        grid: { gridColumn: 2, gridRow: 1 }
      },
      {
        eyebrow: "✦ Resort",
        name: "Bali Cliff Suite",
        price: "From $410 / night",
        img: UNSPLASH("photo-1571896349842-33c89424de2d", 600),
        grid: { gridColumn: 3, gridRow: 1 }
      },
      {
        eyebrow: "✦ Urban",
        name: "Tokyo Skyline",
        price: "From $295 / night",
        img: UNSPLASH("photo-1542314831-068cd1dbfeeb", 600),
        grid: { gridColumn: 2, gridRow: 2 }
      },
      {
        eyebrow: "✦ Desert",
        name: "Namib Lodge",
        price: "From $560 / night",
        img: UNSPLASH("photo-1509316785289-025f5b846b35", 600),
        grid: { gridColumn: 3, gridRow: 2 }
      }
    ]
  },
  rides: {
    hero: {
      eyebrow: "✦ Chauffeur",
      name: "European Grand Tour",
      price: "From $1,200 / day",
      img: UNSPLASH("photo-1449965408869-eaa3f722e40d", 900)
    },
    tiles: [
      {
        eyebrow: "✦ Coastal",
        name: "Amalfi Drive",
        price: "From $680 / day",
        img: UNSPLASH("photo-1503376780353-7e6692767b70", 600),
        grid: { gridColumn: 2, gridRow: 1 }
      },
      {
        eyebrow: "✦ SUV",
        name: "Patagonia Transfer",
        price: "From $520 / day",
        img: UNSPLASH("photo-1533473359331-0135ef1b58bf", 600),
        grid: { gridColumn: 3, gridRow: 1 }
      },
      {
        eyebrow: "✦ Classic",
        name: "Tuscany Roads",
        price: "From $740 / day",
        img: UNSPLASH("photo-1492144534655-ae79c964c9d7", 600),
        grid: { gridColumn: 2, gridRow: 2 }
      },
      {
        eyebrow: "✦ Electric",
        name: "Nordic Quiet",
        price: "From $590 / day",
        img: UNSPLASH("photo-1593941707882-a5bba14938c7", 600),
        grid: { gridColumn: 3, gridRow: 2 }
      }
    ]
  },
  packages: {
    hero: {
      eyebrow: "✦ Signature",
      name: "Honeymoon Atlas",
      price: "From $8,900 / couple",
      img: UNSPLASH("photo-1526772662000-3f88f10405ff", 900)
    },
    tiles: [
      {
        eyebrow: "✦ Weekender",
        name: "Copenhagen & Beyond",
        price: "From $2,400",
        img: UNSPLASH("photo-1513622470522-26c3c8a854bc", 600),
        grid: { gridColumn: 2, gridRow: 1 }
      },
      {
        eyebrow: "✦ Safari",
        name: "Serengeti Slow",
        price: "From $11,200",
        img: UNSPLASH("photo-1516426122078-c23e76319801", 600),
        grid: { gridColumn: 3, gridRow: 1 }
      },
      {
        eyebrow: "✦ Culinary",
        name: "Basque Table",
        price: "From $3,650",
        img: UNSPLASH("photo-1559339352-11d035aa65de", 600),
        grid: { gridColumn: 2, gridRow: 2 }
      },
      {
        eyebrow: "✦ Wellness",
        name: "Costa Rica Reset",
        price: "From $4,100",
        img: UNSPLASH("photo-1540555700478-4be289fbecef", 600),
        grid: { gridColumn: 3, gridRow: 2 }
      }
    ]
  }
};

const TESTIMONIAL_BG = UNSPLASH("photo-1476514525535-07fb3b4ae5f1", 1920);

const Home = () => {
  const navigate = useNavigate();
  const [featuredTab, setFeaturedTab] = useState("stays");
  const [destination, setDestination] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [tripSearchLoading, setTripSearchLoading] = useState("");
  const [searchError, setSearchError] = useState("");
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });
  const featured = FEATURED[featuredTab];

  const runDestinationSearch = async (query, loadingKey = "") => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchError("Please enter a destination.");
      return;
    }

    if (loadingKey) {
      setTripSearchLoading(loadingKey);
    } else {
      setSearchLoading(true);
    }
    setSearchError("");

    try {
      const regionResults = await searchHotelRegions(trimmedQuery);
      if (!regionResults.length) {
        setSearchError("No destination found for this search.");
        return;
      }

      navigate("/search-results", {
        state: toHotelSearchState(trimmedQuery, regionResults)
      });
    } catch (_error) {
      setSearchError("Could not load hotels right now. Please try again.");
    } finally {
      if (loadingKey) {
        setTripSearchLoading("");
      } else {
        setSearchLoading(false);
      }
    }
  };

  const handleDestinationSearch = async (event) => {
    event.preventDefault();
    runDestinationSearch(destination);
  };

  const handleTripSearch = (trip) => {
    runDestinationSearch(trip.searchQuery || trip.name, trip.name);
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/message/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    });

    if (!response.ok) {
      alert("Message could not be sent. Please try again.");
      return;
    }

    setContactData({ name: "", email: "", message: "" });
    alert("Message sent successfully");
  };

  return (
    <div className="luxury-home">
      <header className="lux-nav" role="banner">
        <div className="lux-nav-inner">
          <Link className="lux-nav-logo" to="/">
            Voyager
          </Link>
          <ul className="lux-nav-links">
            <li>
              <a href="#recent-trips">Journeys</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#featured">Featured</a>
            </li>
            <li>
              <a href="#testimonial">Stories</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div className="lux-nav-cta">
            <Link className="lux-pill-btn lux-pill-btn--ghost" to="/signup">
              Plan a trip
            </Link>
          </div>
        </div>
      </header>

      <section className="lux-hero" aria-label="Hero">
        <div className="lux-hero-bg-wrap">
          <div
            className="lux-hero-bg"
            style={{ backgroundImage: `url(${HERO_BG})` }}
            role="img"
            aria-label="Open road through desert landscape"
          />
          <div className="lux-hero-overlay" />
        </div>
        <div className="lux-hero-content">
          <span className="lux-hero-pill">✦ Curated travel</span>
          <h1>
            Wander deeply.
            <br />
            <span className="lux-italic-gold">Rest richly.</span>
          </h1>
          <p className="lux-body lux-hero-sub">
            Private journeys, considered stays, and a team that handles the details before you pack.
          </p>
          <div className="lux-hero-actions">
            <a className="lux-pill-btn lux-pill-btn--gold" href="#recent-trips">
              Explore destinations
            </a>
            <Link className="lux-pill-btn lux-pill-btn--ghost" to="/service">
              View services
            </Link>
          </div>
        </div>
      </section>

      <div className="lux-search-wrap">
        <Reveal delay={0}>
          <form className="lux-search-bar" onSubmit={handleDestinationSearch} aria-label="Search trips">
            <div className="lux-search-field">
              <label htmlFor="lux-dest">Destination</label>
              <input
                id="lux-dest"
                name="destination"
                type="text"
                placeholder="Where to?"
                autoComplete="off"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
            <div className="lux-search-field">
              <label htmlFor="lux-in">Check-in</label>
              <input id="lux-in" name="checkin" type="date" />
            </div>
            <div className="lux-search-field">
              <label htmlFor="lux-guests">Travelers</label>
              <select id="lux-guests" name="travelers" defaultValue="2">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <div className="lux-search-field">
              <label htmlFor="lux-type">Trip type</label>
              <select id="lux-type" name="triptype" defaultValue="leisure">
                <option value="leisure">Leisure</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="business">Business</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
            <div className="lux-search-submit">
              <button
                type="submit"
                className="lux-pill-btn lux-pill-btn--gold"
                aria-label="Search"
                disabled={searchLoading}
              >
                <FiSearch size={18} strokeWidth={2} />
                {searchLoading ? "Searching..." : "Search"}
              </button>
            </div>
            {searchError ? <p className="lux-search-error">{searchError}</p> : null}
          </form>
        </Reveal>
      </div>

      <section className="lux-stats" aria-label="Statistics">
        <Reveal delay={0}>
          <div className="lux-stat">
            <p className="lux-stat-num">120+</p>
            <p className="lux-stat-label">Destinations</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="lux-stat">
            <p className="lux-stat-num">5000+</p>
            <p className="lux-stat-label">Travelers</p>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="lux-stat">
            <p className="lux-stat-num">320+</p>
            <p className="lux-stat-label">Hotels</p>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="lux-stat">
            <p className="lux-stat-num">4.9★</p>
            <p className="lux-stat-label">Rating</p>
          </div>
        </Reveal>
      </section>

      <section id="recent-trips" className="lux-section">
        <Reveal>
          <div className="lux-section-head">
            <p className="lux-eyebrow">✦ Recent trips</p>
            <h2>
              Journeys that <span className="lux-italic-gold">linger.</span>
            </h2>
          </div>
        </Reveal>
        <div className="lux-trip-grid">
          {RECENT_TRIPS.map((trip, i) => (
            <Reveal key={trip.name} delay={(i % 4) * 70}>
              <article className="lux-trip-card">
                <div className="lux-trip-img-wrap">
                  <img src={trip.img} alt="" loading="lazy" onError={handleTripImageError} />
                  <span className="lux-trip-badge">{trip.country}</span>
                </div>
                <div className="lux-trip-body">
                  <h3>{trip.name}</h3>
                  <p className="lux-trip-desc">{trip.desc}</p>
                  <div className="lux-trip-footer">
                    <span className="lux-trip-price">{trip.price}</span>
                    <button
                      type="button"
                      className="lux-trip-arrow"
                      aria-label={`View ${trip.name}`}
                      onClick={() => handleTripSearch(trip)}
                      disabled={tripSearchLoading === trip.name}
                    >
                      <FiArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="lux-services-bg">
        <Reveal>
          <div className="lux-section-head" style={{ paddingTop: "3rem" }}>
            <p className="lux-eyebrow">✦ Our services</p>
            <h2>
              Everything under <span className="lux-italic-gold">one roof.</span>
            </h2>
          </div>
        </Reveal>
        <div className="lux-services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="lux-service-cell">
                <div className="lux-service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="featured" className="lux-section">
        <Reveal>
          <div className="lux-section-head">
            <p className="lux-eyebrow">✦ Featured picks</p>
            <h2>
              Stays, rides, <span className="lux-italic-gold">&amp; packages.</span>
            </h2>
          </div>
        </Reveal>
        <div className="lux-tabs" role="tablist" aria-label="Featured categories">
          {[
            { id: "stays", label: "Stays" },
            { id: "rides", label: "Rides" },
            { id: "packages", label: "Packages" }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={featuredTab === t.id}
              className={`lux-tab ${featuredTab === t.id ? "lux-tab--active" : ""}`}
              onClick={() => setFeaturedTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Reveal delay={60}>
          <div className="lux-mosaic" key={featuredTab}>
            <div className="lux-mosaic-hero">
              <div className="lux-mosaic-bg" style={{ backgroundImage: `url(${featured.hero.img})` }} />
              <div className="lux-mosaic-overlay">
                <p className="lux-eyebrow">{featured.hero.eyebrow}</p>
                <h3>{featured.hero.name}</h3>
                <span className="lux-mosaic-price">{featured.hero.price}</span>
              </div>
            </div>
            {featured.tiles.map((tile) => (
              <div key={tile.name} className="lux-mosaic-card" style={tile.grid}>
                <div className="lux-mosaic-bg" style={{ backgroundImage: `url(${tile.img})` }} />
                <div className="lux-mosaic-overlay">
                  <p className="lux-eyebrow">{tile.eyebrow}</p>
                  <h3>{tile.name}</h3>
                  <span className="lux-mosaic-price">{tile.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="testimonial" className="lux-testimonial" aria-label="Testimonial">
        <div
          className="lux-testimonial-bg"
          style={{ backgroundImage: `url(${TESTIMONIAL_BG})` }}
          role="presentation"
        />
        <div className="lux-testimonial-overlay" />
        <div className="lux-testimonial-inner">
          <Reveal>
            <p className="lux-eyebrow">✦ Guest story</p>
            <div className="lux-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <p className="lux-quote-mark">“</p>
            <blockquote className="lux-quote-text">
              They anticipated every connection, every meal, every view. It felt less like planning—and more like
              being looked after by old friends who happen to know the world intimately.
            </blockquote>
            <div className="lux-reviewer">
              <img
                src={UNSPLASH("photo-1494790108377-be9c29b29330", 200)}
                alt=""
                loading="lazy"
              />
              <div className="lux-reviewer-meta">
                <strong>Claire Whitmore</strong>
                <span>Honeymoon · Italy &amp; Greece</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="lux-contact-bg">
        <div className="lux-contact-grid">
          <Reveal>
            <div>
              <p className="lux-eyebrow">✦ Contact us</p>
              <h2 className="lux-heading-display" style={{ fontSize: "clamp(2rem, 3.5vw, 2.65rem)" }}>
                Begin your <span className="lux-italic-gold">next chapter.</span>
              </h2>
              <div className="lux-contact-rows">
                <div className="lux-contact-row">
                  <FiMapPin size={20} />
                  <div>
                    <p className="label">Studio</p>
                    <p className="value">18 Mercer Street, New York, NY</p>
                  </div>
                </div>
                <div className="lux-contact-row">
                  <FiPhone size={20} />
                  <div>
                    <p className="label">Phone</p>
                    <p className="value">+1 (212) 555-0198</p>
                  </div>
                </div>
                <div className="lux-contact-row">
                  <FiMail size={20} />
                  <div>
                    <p className="label">Email</p>
                    <p className="value">concierge@voyager.travel</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form className="lux-form" onSubmit={handleContactSubmit}>
              <label htmlFor="lux-fn">Full name</label>
              <input id="lux-fn" name="name" type="text" autoComplete="name" placeholder="Your name" value={contactData.name} onChange={handleContactChange} required />
              <label htmlFor="lux-em">Email</label>
              <input id="lux-em" name="email" type="email" autoComplete="email" placeholder="you@email.com" value={contactData.email} onChange={handleContactChange} required />
              <label htmlFor="lux-msg">Message</label>
              <textarea id="lux-msg" name="message" placeholder="Tell us about your trip" value={contactData.message} onChange={handleContactChange} required />
              <button type="submit" className="lux-pill-btn lux-pill-btn--gold">
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="lux-cta-banner" aria-label="Call to action">
        <div className="lux-cta-spotlight" />
        <Reveal>
          <h2>
            Ready when <span className="lux-italic-gold">you are.</span>
          </h2>
          <p className="lux-body" style={{ margin: "0 auto 1.75rem", maxWidth: 440 }}>
            Share your dates and dreams—we will return a tailored outline within one business day.
          </p>
          <Link className="lux-pill-btn lux-pill-btn--gold" to="/signup">
            Start planning
          </Link>
        </Reveal>
      </section>

      <footer className="lux-footer">
        <div className="lux-footer-main">
          <div className="lux-footer-brand">
            <Link className="lux-nav-logo" to="/">
              Voyager
            </Link>
            <p>Quietly exceptional travel for people who value time, taste, and trust.</p>
            <div className="lux-footer-social">
              <a href="https://www.instagram.com/" aria-label="Instagram" rel="noreferrer" target="_blank">
                <BsInstagram />
              </a>
              <a href="https://www.facebook.com/" aria-label="Facebook" rel="noreferrer" target="_blank">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/" aria-label="Twitter" rel="noreferrer" target="_blank">
                <GrTwitter />
              </a>
            </div>
          </div>
          <div className="lux-footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/service">Services</Link>
              </li>
              <li>
                <a href="#recent-trips">Destinations</a>
              </li>
            </ul>
          </div>
          <div className="lux-footer-col">
            <h4>Account</h4>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <a href="#contact">Concierge</a>
              </li>
            </ul>
          </div>
          <div className="lux-footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/">Privacy</a>
              </li>
              <li>
                <a href="/">Terms</a>
              </li>
              <li>
                <a href="/">Cookies</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lux-footer-bar">
          <span>© {new Date().getFullYear()} Voyager Travel. All rights reserved.</span>
          <div>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
