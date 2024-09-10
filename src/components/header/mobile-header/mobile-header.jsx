"use client";

import Link from "next/link";
import Box from "@mui/material/Box"; 
// GLOBAL CUSTOM COMPONENTS

import Image from "components/BazaarImage";
import { FlexBetween, FlexBox } from "components/flex-box";
export default function MobileHeader({
  children
}) {
  return <FlexBetween width="100%">{children}</FlexBetween>;
}

MobileHeader.Left = ({
  children
}) => {
  return <Box flex={1}>{children}</Box>;
};

MobileHeader.Logo = ({
  logoUrl
}) => {
  return <Link href="/">
      <Image height={44} src={logoUrl} alt="logo" />
    </Link>;
};

MobileHeader.Right = ({
  children
}) => {
  return <FlexBox justifyContent="end" flex={1}>
      {children}
    </FlexBox>;
};