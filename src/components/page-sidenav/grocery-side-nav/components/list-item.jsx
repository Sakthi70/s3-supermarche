"use client";


import { Box } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import FlexBox from "components/flex-box/flex-box"; 
// CUSTOM ICON COMPONENTS

import appIcons from "icons"; 
import Image from "next/image";
// ==============================================================


// ==============================================================
export default function ListItem({
  title,
  icon
}) {
  // const Icon = appIcons[icon];
  return <FlexBox py={1} gap={1.5} alignItems="center">
      {/* <Icon fontSize="small" /> */}
     {icon ? <Image style={{borderRadius:'50%'}} src={icon} width={50}  height={50} alt={title}/> : <Box width={50} height={50}></Box>}
      <Span fontWeight={600}>{title}</Span>
    </FlexBox>;
}