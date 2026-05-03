import React, { useCallback, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import "../usersignin/signin.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectPath = location.state?.from || "/";
  const redirectState = location.state?.bookingState;

  const finishLogin = useCallback(() => {
    setIsLoggedIn(true);
    navigate(redirectPath, { replace: true, state: redirectState });
  }, [navigate, redirectPath, redirectState, setIsLoggedIn]);

  const handleGoogleSuccess = useCallback(() => {
    finishLogin();
  }, [finishLogin]);

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/login/", { email, password })
        .then((res) => {
          if (res.data === "exist") {
            finishLogin();
          } else if (res.data === "donot exist") {
            alert("User has not signed up or wrong password");
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
        <p className="lux-eyebrow">✦ Member Access</p>
        <h1 className="lux-title">Welcome <em>back</em></h1>
        <p className="auth-subtitle">Enter your private travel desk and continue planning refined stays.</p>
        {location.state?.notice ? <p className="auth-notice">{location.state.notice}</p> : null}

        <GoogleSignInButton onSuccess={handleGoogleSuccess} />

        <div className="auth-divider"><span>or continue with email</span></div>

        <form className="auth-form" onSubmit={submit}>
          <label className="lux-label">
            Email
            <input className="lux-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" required />
          </label>

          <label className="lux-label">
            <span className="label-row">
              Password
              <Link to="/login">Forgot password?</Link>
            </span>
            <input className="lux-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </label>

          <button className="lux-btn-primary auth-submit" type="submit">Sign In</button>
        </form>

        <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
      </motion.div>
    </section>
  );
};

export default Login;
