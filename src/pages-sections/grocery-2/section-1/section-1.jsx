"use client";

import useTheme from "@mui/material/styles/useTheme"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
import { H1, H5, H6 } from "components/Typography";
// CUSTOM DATA MODEL


// STYLED COMPONENTS
import { GridItemOne, GridItemTwo, StyledRoot, StyledGrid } from "./styles"; 
import { useEffect, useState } from "react";
import { getBanners } from "actions/banner";
// ========================================================================


// ========================================================================
export default function Section1() {
  const {
    direction
  } = useTheme();
  const [banners, setBanners] = useState([]);


  const getBannerList =async() => {
   await getBanners(1).then(({banners}) => setBanners(banners));
  } 

  useEffect(() => {
    getBannerList();
  }, [])


  return <StyledRoot className="mb-3">
      <Carousel dots 
// autoplay
    arrows={false} infinite={banners.length > 3} spaceBetween={0} slidesToShow={1}  dotColor="white" dotStyles={{
      bottom: 25,
      position: "absolute",
      ...(direction === "rtl" ? {
        right: 40
      } : {
        left: 40
      })
    }}>
        {banners.map(item => <StyledGrid container key={item.id}>
            <GridItemOne item md={7} sm={7} xs={12}>
              <H1 maxWidth={280} mb={1} lineHeight="1.27">
                {item.title}
              </H1>

              <H6 maxWidth={470} color="inherit" fontWeight={400} mb={5}>
                <div dangerouslySetInnerHTML={{__html: item.description}} />
              </H6>

              {/* <H5 fontSize={18} fontWeight={700} mb={2.5}>
                Try our mobile app!
              </H5> */}

              {/* <AppStore /> */}
            </GridItemOne>

            <GridItemTwo item md={5} sm={5} xs={12}>
              <LazyImage priority width={570} height={360}  src={item.image} alt={item.title} />
            </GridItemTwo>
          </StyledGrid>)}
      </Carousel>
    </StyledRoot>;
}