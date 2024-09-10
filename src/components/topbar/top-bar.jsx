"use client";

import { useState } from "react"; 
// MUI

import IconButton from "@mui/material/IconButton"; 
// TRANSLATION

import { useTranslation } from "react-i18next"; 
// MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove"; 
// GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";

// STYLED COMPONENTS
import { LeftContent, StyledChip, StyledContainer, StyledRoot } from "./styles"; 
// ===========================================


// ===========================================
export default function Topbar({
  title,
  label,
  bgColor,
  children
}) {
  const {
    t
  } = useTranslation();
  const [expand, setExpand] = useState(false);
  return <StyledRoot bgColor={bgColor} expand={expand}>
      <StyledContainer>
        <LeftContent>
          <div className="tag">
            <StyledChip label={t(label)} size="small" />
            <Span className="title">{t(title)}</Span>
          </div>

          <IconButton disableRipple className="expand" onClick={() => setExpand(state => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </LeftContent>

        {children}
      </StyledContainer>
    </StyledRoot>;
}

Topbar.Right = function ({
  children
}) {
  return <div className="topbarRight">{children}</div>;
};