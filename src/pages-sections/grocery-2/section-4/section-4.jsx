"use client";

import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { H3, H5 } from "components/Typography";
import { Carousel } from "components/carousel"; 
// STYLED COMPONENT
import { StyledGrid } from "./styles"; 
import { useEffect, useState } from "react";
import { getBanners } from "actions/banner";
// CUSTOM DATA MODEL

function rgbaToHex(r, g, b, a) {
  // Ensure RGB values are in the range of 0-255
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255); // Convert alpha to 0-255 range

  // Convert RGB to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  // Convert alpha to hex
  const aHex = a.toString(16).padStart(2, '0');

  // Combine to form the hex code
  return `#${rHex}${gHex}${bHex}${aHex}`;
}

const extractColors = async (url) => {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Enable CORS
      img.src = url;

      img.onload = () => {
          try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

      // Get the pixel data of the top-left corner (position: 0,0)
      const pixelData = ctx.getImageData(0, 0, 1, 1).data;

      // Extract RGB values from the pixel data
      const [red, green, blue] = pixelData;

      // Convert RGB values to hex code
      const hexCode = rgbaToHex(red, green, blue,0.2);
                  resolve(hexCode); 
          } catch (error) {
              reject(error);
          }
      };

      img.onerror = () => {
          reject('Image load error');
      };
  });
};


export default function Section4() {
  const [banners, setBanners] = useState([]);


  const getBannerList =async() => {
    
   let bans = await getBanners(0).then(({banners}) => banners);
   for(let i =0;i< bans.length ;i++){

    let bgColor = await extractColors(bans[i].image);
    bans[i]['bgColor'] = bgColor;
   }
   setBanners(bans)
  } 

  useEffect(() => {
    getBannerList();
  }, [])

  return <div className="mb-3">
      <Carousel dots autoplay adaptiveHeight arrows={false} spaceBetween={0} slidesToShow={1}>
        {banners.map((item, ind) => <div key={ind}>
            <StyledGrid container sx={{
          bgcolor: item.bgColor
        }}>
              <Grid item lg={7} sm={9} xs={12}>
                <H5 mb={1} fontWeight={600} fontSize={{
              sm: 18,
              xs: 14
            }}>
                  <div dangerouslySetInnerHTML={{__html: item.description}} />
                </H5>

                <H3 lineHeight="1.37" mb={{
              sm: 4,
              xs: 3
            }} fontSize={{
              sm: 35,
              xs: 24
            }}>
                  {item.title}
                </H3>

                {/* <Button variant="contained" color="primary" LinkComponent={Link} href={item.shopUrl}>
                  Shop Now
                </Button> */}
              </Grid>

              <Grid item lg={5} xs={12} className="grid-2">
                <LazyImage width={320} height={200} alt={item.title} src={item.image} />
              </Grid>
            </StyledGrid>
          </div>)}
      </Carousel>
    </div>;
}