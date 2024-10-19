"use client"
import React from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, SnackbarContent, useMediaQuery} from "@mui/material";
import './index.css';

const CookieConsent = (props) => {
  const [showConsent, setShowConsent] = React.useState(true);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
        setShowConsent(hasCookie("localConsent"));
    }, 3000)

    return () => clearTimeout(timeout)

  }, [])

  if (showConsent) {
    return null;
  }

  
  return (
  <div className="wrapper show">
      <header>
        <i className="bx bx-cookie"></i>
        <h2>Cookies Consent</h2>
      </header>

      <div className="data">
        <p>This website use cookies to help you have a superior and more relevant browsing experience on the website. </p>
      </div>

      <div className="buttons">
        <button className="button" id="acceptBtn" onClick={acceptCookie}>Accept</button>
      </div>
    </div>

  );
};

export default CookieConsent;