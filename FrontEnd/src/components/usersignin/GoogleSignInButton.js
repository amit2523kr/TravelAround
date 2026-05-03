import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const scriptId = "google-identity-services";

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

const GoogleSignInButton = ({ onSuccess }) => {
  const buttonRef = useRef(null);
  const [error, setError] = useState("");
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID?.trim();

  useEffect(() => {
    if (!clientId) {
      setError("Add REACT_APP_GOOGLE_CLIENT_ID in FrontEnd/.env, then restart the React server.");
      return;
    }

    let mounted = true;

    loadGoogleScript()
      .then(() => {
        if (!mounted || !buttonRef.current) return;

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            try {
              const response = await axios.post("http://localhost:8000/google-login/", { credential });
              if (response.data?.status === "success") {
                onSuccess(response.data.user);
              }
            } catch (_error) {
              setError("Google sign-in failed. Please try again.");
            }
          }
        });

        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: buttonRef.current.offsetWidth || 360
        });
      })
      .catch(() => {
        if (mounted) setError("Google sign-in could not load.");
      });

    return () => {
      mounted = false;
    };
  }, [clientId, onSuccess]);

  if (!clientId) {
    return <p className="auth-error">{error}</p>;
  }

  return (
    <div className="google-auth-wrap">
      <div ref={buttonRef} />
      {error ? <p className="auth-error">{error}</p> : null}
    </div>
  );
};

export default GoogleSignInButton;
