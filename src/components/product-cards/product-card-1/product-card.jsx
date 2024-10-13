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
import { calculateDiscountPercentage, getRandomItem } from "utils/util";
import { NO_IMAGE_FOR_PRODUCT } from "utils/constants";
import Image from "next/image";
import { auth } from "auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DialogDrawer from "components/header/components/dialog-drawer";
import Warning from "components/warning/warning";
import useApp from "hooks/useApp";
import { CategoryWrapper } from "pages-sections/vendor-dashboard/styles";
// ========================================================


// ========================================================
export default function ProductCard1({
  id,
  slug,
  title,
  price,
  salePrice,
  imgUrl,
  rating = 5,
  hideRating,
  variant,
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
  const {loading}=useApp();
  const [dialogOpen, setdialogOpen] = useState(false)
  const [openDelete, setopenDelete] = useState(false);

  const handleIncrementQuantity = () => {
    if(status === 'unauthenticated'){
      setdialogOpen(true)
    }else{
    const product = {
      id,
      slug,
      price,
      salePrice,
      limit: productData.limit,
      stock: productData.stock,
      variant,
      imgUrl:imgUrl.length > 0 ? imgUrl[0] : NO_IMAGE_FOR_PRODUCT,
      name: title,
      qty: (cartItem?.qty || 0) + 1
    };
    handleCartAmountChange(product);
  }
  };

  const onDelete =async() =>{
    loading(true)
    setopenDelete(false);
        await toggleDelete(id);
        loading(false)
  }

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      salePrice,
      variant,
      limit: productData.limit,
      stock: productData.stock,
      imgUrl:imgUrl.length > 0 ? imgUrl[0] : NO_IMAGE_FOR_PRODUCT,
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
        <DiscountChip discount={calculateDiscountPercentage(price,salePrice)} />
        <Warning open={openDelete} handleClose={() => setopenDelete(false)} content={'Are you sure to delete the product?'} submit="Confirm" ok={'Cancel'} title={'Delete Product'} onSubmit={onDelete} isSubmit={true}/>
        <HoverActions  isEdit={isPreview} isToggleView={true} isDelete={isPreview} toggleView={toggleDialog} toggleDelete={() => setopenDelete(true)} toggleEdit={toggleEdit} />

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

      <ContentWrapper style={{justifyContent:'space-between'}}>
        <Box  minWidth="0px" mr={1}>
        
          <ProductTitle title={title} slug={id} />
        <ProductPrice discount={salePrice} price={price} />
        </Box>

        {
          /* PRODUCT QUANTITY HANDLER BUTTONS */
        }
      <Box  minWidth="0px" display={'flex'} justifyContent={'end'} flexDirection={'column'} gap={1} alignItems={'end'} >
        {(variant && variant !="") &&<CategoryWrapper>{variant}</CategoryWrapper>}
       {!isPreview  && <QuantityButtons limit={productData.limit} stock={productData.stock}  quantity={cartItem?.qty || 0} handleIncrement={handleIncrementQuantity} handleDecrement={handleDecrementQuantity} />}
      </Box>
      </ContentWrapper>
      <DialogDrawer
        dialogOpen={dialogOpen}
        toggleDialog={() => setdialogOpen(!dialogOpen)}
      />
    </StyledBazaarCard>;
}