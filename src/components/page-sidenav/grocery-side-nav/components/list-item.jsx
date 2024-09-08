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
     {icon ? <Image src={icon} width={16} height={16} alt={title}/> : <Box width={16} height={16}></Box>}
      <Span fontWeight={600}>{title}</Span>
    </FlexBox>;
}