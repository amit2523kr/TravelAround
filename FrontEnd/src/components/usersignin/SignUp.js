import React, { useCallback, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import "../usersignin/signin.css";

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSuccess = useCallback(() => {
    setIsLoggedIn?.(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  }, [navigate, setIsLoggedIn]);

  async function submit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios
        .post("http://localhost:8000/signup/", { fname, lname, email, password })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exist");
          } else if (res.data === "created" || res.data === "donot exist") {
            navigate("/login");
          }
        })
        .catch((error) => {
          alert("wrong details");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="auth-shell">
      <motion.div className="auth-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <p className="lux-eyebrow">✦ Begin The Journey</p>
        <h1 className="lux-title">Create your <em>account</em></h1>
        <p className="auth-subtitle">Join the private desk for meeting-ready hotels, suites, and destination stays.</p>

        <GoogleSignInButton onSuccess={handleGoogleSuccess} />

        <div className="auth-divider"><span>or continue with email</span></div>

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-row">
            <label className="lux-label">
              First Name
              <input className="lux-input" type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="Amit" required />
            </label>
            <label className="lux-label">
              Last Name
              <input className="lux-input" type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Kumar" required />
            </label>
          </div>

          <label className="lux-label">
            Email
            <input className="lux-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" required />
          </label>
          <label className="lux-label">
            Password
            <input className="lux-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" required />
          </label>
          <label className="lux-label">
            Confirm Password
            <input className="lux-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" required />
          </label>

          <button className="lux-btn-primary auth-submit" type="submit">Sign Up</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
      </motion.div>
    </section>
  );
};

export default Signup;
