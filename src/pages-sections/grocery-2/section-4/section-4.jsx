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

function rgbaToHex(r, g, b) {
  // Ensure RGB values are in the range of 0-255
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  let a = Math.round(0.3* 255); 
  // a = Math.round(a * 255); // Convert alpha to 0-255 range

  // Convert RGB to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  const aHex = a.toString(16).padStart(2, '0');
  // Convert alpha to hex
  // const aHex = a.toString(16).padStart(2, '0');

  // Combine to form the hex code
  return `#${rHex}${gHex}${bHex}${aHex}`;
}

function getLightColorFromImageUrl(imageUrl, callback) {
  // Create an image element
  const img = new Image();
  img.crossOrigin = "Anonymous"; // Handle cross-origin images

  // Create a canvas to draw the image on
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  img.onload = function() {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);
      
      // Get image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Variables to store color totals and pixel count
      let r = 0, g = 0, b = 0, count = 0;

      // Loop through each pixel to accumulate color values
      for (let i = 0; i < data.length; i += 4) {
          // Extract RGBA values
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];
          const alpha = data[i + 3];
          
          // Only consider non-transparent pixels
          if (alpha > 0) {
              r += red;
              g += green;
              b += blue;
              count++;
          }
      }
      
      // Compute the average color values
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      
      // Return the average color as a hex string
      const avgColor =rgbaToHex(r,g,b);

      if (callback) {
          callback(avgColor);
      }
  };

  // Handle image loading errors
  img.onerror = function() {
      console.error('Failed to load image.');
      if (callback) {
          callback(null);
      }
  };

  // Set the source of the image
  img.src = imageUrl;
}



export default function Section4() {
  const [banners, setBanners] = useState([]);


  const getBannerList =async() => {
    
   let bans = await getBanners(0).then(({banners}) => banners);
   for(let i =0;i< bans.length ;i++){

    getLightColorFromImageUrl(bans[i].image, function (color) {
       if (color) {
        bans[i]['bgColor'] = color;
         console.log('Dominant light color:', color);
       } else {
         console.log('Could not determine color.');
       }
     });
    console.log(bans[i]['bgColor'])
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

               {(item.slug && item.slug!=="") && <Button variant="contained" color="primary" LinkComponent={Link} href={item.slug}>
                  Shop Now
                </Button>}
              </Grid>

              <Grid item lg={5} xs={12} className="grid-2">
                <LazyImage width={320} height={200} alt={item.title} src={item.image} />
              </Grid>
            </StyledGrid>
          </div>)}
      </Carousel>
    </div>;
}