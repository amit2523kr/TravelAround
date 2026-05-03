import React from "react";
import "./Footer.css";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { AiFillBehanceSquare } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>✦ Travel</h2>
          <p>Curated stays and meetings for journeys with a little ceremony.</p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.instagram.com/" aria-label="Instagram"><BsInstagram /></a>
            <a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com/i/flow/login" aria-label="Twitter"><GrTwitter /></a>
            <a href="https://www.behance.net/" aria-label="Behance"><AiFillBehanceSquare /></a>
          </div>
        </div>

        <div>
          <h4>Get In Touch</h4>
          <a href="/">Pune Hinjewadi</a>
          <a href="/">Cognizant Phase 3</a>
          <a href="/">+91-8978675</a>
          <a href="/">Worldtour@gmail.com</a>
        </div>

        <div>
          <h4>About Us</h4>
          <a href="/">How it works</a>
          <a href="/">Start planning</a>
          <a href="/">Reviews</a>
          <a href="/">Contact us</a>
        </div>

        <div>
          <h4>From The Blog</h4>
          <a href="/">Planning your trip</a>
          <a href="/">Product guides</a>
          <a href="/">Destinations</a>
          <a href="/">Tours</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
