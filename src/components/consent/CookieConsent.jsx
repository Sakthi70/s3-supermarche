"use client"
import React from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, SnackbarContent, useMediaQuery} from "@mui/material";

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

  const action = (
    <Button color="primary" size="small" onClick={acceptCookie}>
      Accept
    </Button>
  );


  return (
    <Box position={'sticky'} p={2} sx={{bottom:0, zIndex:1999}}>
    <SnackbarContent
    message="This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy."
    action={action}
  />
  </Box>
  );
};

export default CookieConsent;