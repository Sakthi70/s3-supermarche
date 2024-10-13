"use client";

import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled"; 
// GLOBAL CUSTOM COMPONENT

import FlexBox from "components/flex-box/flex-box"; 
// DATA
import Twitter from "icons/Twitter";
import Youtube from "icons/Youtube";
import Facebook from "icons/Facebook";
import Instagram from "icons/Instagram";
import useApp from "hooks/useApp";
// STYLED COMPONENTS

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== "variant"
})(({
  variant,
  theme
}) => ({
  margin: 4,
  fontSize: 12,
  padding: "10px",
  ...(variant === "light" && {
    backgroundColor: "rgba(0,0,0,0.2)"
  }),
  ...(variant === "dark" && {
    backgroundColor: theme.palette.grey[700],
    ":hover": {
      backgroundColor: theme.palette.grey[800]
    }
  }),
  ".icon": {
    color: "white"
  }
})); 
// ==============================================================


// ==============================================================
export default function SocialLinks({
  variant = "light"
}) {

  const {content}=useApp();
  const {settings} = content;
   const SOCIAL_ICON_LINKS = [{
    Icon: Facebook,
    url: settings.facebook
  }, {
    Icon: Twitter,
    url: settings.twitter
  }, {
    Icon: Youtube,
    url: settings.youtube
  }, {
    Icon: Instagram,
    url: settings.instagram
  }];

  return <FlexBox className="flex" mx={-0.625}>
      {SOCIAL_ICON_LINKS.map(({
      Icon,
      url
    }, ind) => <a href={url} target="_blank" rel="noreferrer noopenner" key={ind}>
          <StyledIconButton variant={variant}>
            <Icon fontSize="inherit" className="icon" />
          </StyledIconButton>
        </a>)}
    </FlexBox>;
}