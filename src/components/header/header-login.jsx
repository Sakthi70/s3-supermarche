"use client";

import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import PersonOutline from "@mui/icons-material/PersonOutline";
export default function HeaderLogin() {
  return <IconButton LinkComponent={Link} href="/login">
      <PersonOutline sx={{
      color: "grey.600"
    }} />
    </IconButton>;
}