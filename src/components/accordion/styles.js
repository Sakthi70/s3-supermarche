"use client";

import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled"; 
// STYLED COMPONENT

export const RootContainer = styled(Box, {
  shouldForwardProp: prop => prop !== "open"
})(({
  open,
  theme
}) => ({
  display: "flex",
  alignItems: "center",
  padding: ".5rem 1rem",
  justifyContent: "space-between",
  ".caret": {
    transition: "transform 250ms ease-in-out",
    transform: `rotate(${open ? "90deg" : "0deg"})`,
    ...(theme.direction === "rtl" && {
      transform: `rotate(${open ? "90deg" : "180deg"})`
    })
  }
}));