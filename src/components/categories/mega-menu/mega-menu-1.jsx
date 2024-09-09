import Link from "next/link"; 
// MUI

import Box from "@mui/material/Box"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage"; 
// LOCAL CUSTOM COMPONENTS

import ColumnList from "./column-list"; 
// DATA TYPE


// =========================================================
export default function MegaMenu1({
  banner,
  data
}) {
  return <ColumnList list={data} banner={banner}>
      
    </ColumnList>;
}