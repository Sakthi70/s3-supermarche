import Link from "next/link"; 
// MUI

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import OverlayScrollbar from "components/overlay-scrollbar";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link"; 
// STYLED COMPONENTS

import { StyledRoot } from "./styles"; 
import Image from "next/image";
import { Span } from "components/Typography";
// DATA TYPES


// ==============================================================
export default function ColumnList({
  list,
  children,
  banner,
  minWidth = 760
}) {
  return <OverlayScrollbar className="category-list">
  <StyledRoot elevation={2} pr={2} sx={{
    minWidth : {sm:400, md:600,lg:minWidth, maxHeight:'90vh',overflowY:'auto'}
  }}>
      <FlexBox px={2.5}>
        <Box flex="1 1 0">
          <Grid container spacing={4}>
            {list.map((item, ind) => <Grid item md={6} lg={4} sm={12} key={ind}>

            <FlexBox py={1} gap={1.5} alignItems="center">
     {item.image ? <Image style={{borderRadius:'50%'}} src={item.image} width={40}  height={40} alt={item.name}/> : <Box width={40} height={40}></Box>}
     <NavLink className="child-link" href={`/products/search${item.slug}`} key={ind}><Span fontWeight={600}>{item.name}</Span></NavLink>
    </FlexBox>
                {/* <div className="title-link">{item.name}</div> */}

                {item.child?.map((sub, ind) =>
                <FlexBox py={1} gap={1.5} alignItems="center">
                {sub.image ? <Image style={{borderRadius:'50%'}} src={sub.image} width={30}  height={30} alt={sub.name}/> : <Box width={30} height={30}></Box>}
                <NavLink className="child-link" href={`/products/search${sub.slug}`} key={ind}>{sub.name}</NavLink>
               </FlexBox>
                )}
              </Grid>)}
          </Grid>
        </Box>

        {/* {banner?.position === "right" ? <Box mt={1.5}>
            <Link href={banner.href}>
              <LazyImage src={banner.url} width={137} height={318} alt="banner" />
            </Link>
          </Box> : null} */}
      </FlexBox>

      {children}
    </StyledRoot></OverlayScrollbar>;
}