"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog"; 
// LOCAL CUSTOM HOOK

import useProduct from "../use-product"; 
// LOCAL CUSTOM COMPONENTS

import HoverActions from "./components/hover-actions";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./components/quantity-buttons"; 
// STYLED COMPONENTS

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"; 
import { getRandomItem } from "utils/util";
import { NO_IMAGE_FOR_PRODUCT } from "utils/constants";
import Image from "next/image";
import { auth } from "auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DialogDrawer from "components/header/components/dialog-drawer";
// ========================================================


// ========================================================
export default function ProductCard1({
  id,
  slug,
  title,
  price,
  imgUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  discount = 5,
  showProductSize,
  productData,
  isPreview = false,
  toggleDelete,
  toggleEdit
}) {
  const {
    isFavorite,
    openModal,
    cartItem,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange
  } = useProduct(id);

  const { data: session, status } = useSession();

  const [dialogOpen, setdialogOpen] = useState(false)

  const handleIncrementQuantity = () => {
    if(status === 'unauthenticated'){
      setdialogOpen(true)
    }else{
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) + 1
    };
    handleCartAmountChange(product);
  }
  };

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) - 1
    };
    handleCartAmountChange(product, "remove");
  };
  return <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {
        /* DISCOUNT PERCENT CHIP IF AVAILABLE */
      }
        <DiscountChip discount={discount} />

        {
        /* HOVER ACTION ICONS */
      }
        <HoverActions  isEdit={isPreview} isToggleView={true} toggleView={toggleDialog} toggleDelete={toggleDelete} toggleEdit={toggleEdit} />

        {
        /* PRODUCT IMAGE / THUMBNAIL */
      }
        <Link href={isPreview ? `/products/${id}?isPreview=true` : `/products/${id}`} >
          <LazyImage priority src={ imgUrl && imgUrl.length > 0 ? imgUrl[0] : NO_IMAGE_FOR_PRODUCT} sx={{height:230, width:'100%', objectFit: imgUrl && imgUrl.length > 0 ? 'contain':'cover'}} width={500} height={500} alt={title} />
        </Link>
      </ImageWrapper>

      {
      /* PRODUCT VIEW DIALOG BOX */
    }
      <ProductViewDialog handleIncrementQuantity={handleIncrementQuantity} isPreview={isPreview} openDialog={openModal} handleCloseDialog={toggleDialog} product={productData} />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
        
          <ProductTitle title={title} slug={slug} />

          <ProductPrice discount={productData.offerPrice} price={price} />
        </Box>

        {
        /* PRODUCT QUANTITY HANDLER BUTTONS */
      }
       {!isPreview  && <QuantityButtons quantity={cartItem?.qty || 0} handleIncrement={handleIncrementQuantity} handleDecrement={handleDecrementQuantity} />}
      </ContentWrapper>
      <DialogDrawer
        dialogOpen={dialogOpen}
        toggleDialog={() => setdialogOpen(!dialogOpen)}
      />
    </StyledBazaarCard>;
}