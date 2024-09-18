"use client";

import Link from "next/link";
import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart";
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { H1, H2, H3, H4, H5, H6,Small } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib";
// DUMMY DATA

import productVariants from "data/product-variants";
import { NO_IMAGE_FOR_PRODUCT } from "utils/constants";
import Image from "next/image";
// CUSTOM DATA MODEL

// ================================================================
export default function ProductIntro({ product }) {
  const { id, price, name, images, slug } = product || {};
  const { state, dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1",
  });
  // HANDLE CHANGE TYPE AND OPTIONS

  const handleChangeVariant = (variantName, value) => () => {
    setSelectVariants((state) => ({
      ...state,
      [variantName.toLowerCase()]: value,
    }));
  };
  // CHECK PRODUCT EXIST OR NOT IN THE CART

  const cartItem = state.cart.find((item) => item.id === id);
  // HANDLE SELECT IMAGE

  const handleImageClick = (ind) => () => setSelectedImage(ind);
  // HANDLE CHANGE CART

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: name,
        imgUrl: images.length > 0 ? images[0] : NO_IMAGE_FOR_PRODUCT ,
        id,
        slug,
      },
    });
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          <Grid container>
          <Grid item sm={2} xs={12} order={{xs:1,sm:0}} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <FlexBox overflow="auto" sx={{flexDirection:{sx:'row',sm:'column'}}}>
            {images && images.length >0 ? images.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                m={ 1}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === images.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar
                  alt="product"
                  src={url}
                  variant="square"
                  sx={{
                    height: 40,
                  }}
                />
              </FlexRowCenter>
            )): <FlexRowCenter
            width={64}
            height={64}
            minWidth={64}
            bgcolor="white"
            border="1px solid"
            borderRadius="10px"
            ml={ "auto" }
            style={{
              cursor: "pointer",
            }}
            onClick={handleImageClick(0)}
            mr={ "auto" }
            borderColor={"primary.main" 
            }
          >
            <Avatar
              alt="product"
              src={NO_IMAGE_FOR_PRODUCT}
              variant="square"
              sx={{
                height: 40,
              }}
            />
          </FlexRowCenter>}
          </FlexBox>
          </Grid>
          <Grid item sm={10} xs={12} p={1} order={{xs:0,sm:1}} >
          <LazyImage
              alt={name}
              width={300}
              height={300}
              loading="eager"
              src={product.images.length > 0 ?  product.images[selectedImage]: NO_IMAGE_FOR_PRODUCT}
              sx={{
                objectFit: "contain",
              }}
            />
          </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{name}</H1>

          {/* PRODUCT BRAND */}
          
          <Small> {product.shortDescription}</Small>

          {/* PRICE & STOCK */}
          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(price)}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>

          {/* ADD TO CART BUTTON */}
          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 2.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={2.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}
{product.isBrand && <><FlexBox alignItems="center" mb={1}>
            <div>Brand: </div>
            <H6>{product.brandName}</H6>
          </FlexBox>
          {product.brandImage && <Image src={product.brandImage} height={50} width={100} style={{objectFit:'contain'}} alt={name}></Image>}
          </>}
          {/* SHOP NAME */}
          {/* <FlexBox alignItems="center" gap={1} mb={2}>
            <div>Sold By:</div>
            <Link href="/shops/scarlett-beauty">
              <H6></H6>
            </Link>
          </FlexBox> */}
        </Grid>
      </Grid>
      <Box my={2}>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </Box>
    </Box>
  );
}
