import Link from "next/link";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import styled from "@mui/material/styles/styled"; 
// GLOBAL CUSTOM COMPONENTS

import { H5 } from "components/Typography";
import LazyImage from "components/LazyImage"; 
// LOCAL CUSTOM HOOK

import useProduct from "../use-product"; 
// LOCAL CUSTOM COMPONENTS

import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import ProductTags from "./components/tags";
import AddToCartButton from "./components/add-to-cart";
import FavoriteButton from "./components/favorite-button"; 
import { useSession } from "next-auth/react";
import useApp from "hooks/useApp";
import { useState } from "react";
import QuantityButtons from "../product-card-1/components/quantity-buttons";
import { calculateDiscountPercentage } from "utils/util";
import { CategoryWrapper } from "pages-sections/vendor-dashboard/styles";
import { Divider } from "@mui/material";
// STYLED COMPONENT

const Wrapper = styled(Card)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem"
});
const ContentWrapper = styled("div")(({
  theme
}) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  "& .img-wrapper": {
    width: 150,
    flexShrink: 0,
    position: "relative",
    // backgroundColor: theme.palette.grey[200]
  },
  "& .content": {
    flex: 1,
    padding: "1rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    "& .img-wrapper": {
      width: "100%"
    },
    "& .content": {
      width: "100%"
    }
  }
})); 
// ===========================================================


// ===========================================================
export default function ProductCard9(props) {
  const {
   id,
   slug,
  title,
  price,
  limit,stock,
  salePrice,
  variant,
  imgUrl,
  tags,
  } = props || {};
  const {
    cartItem,
    handleCartAmountChange,
    isFavorite,
    toggleFavorite
  } = useProduct(id);


  const { data: session, status } = useSession();
  const {loading}=useApp();
  const [dialogOpen, setdialogOpen] = useState(false)
  
  const handleIncrementQuantity = () => {
    if(status === 'unauthenticated'){
      setdialogOpen(true)
    }else{
    const product = {
      id,
      slug,
      price,
      salePrice,
      variant,
      limit,stock,
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
      salePrice,
      variant,
      limit,stock,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) - 1
    };
    handleCartAmountChange(product, "remove");
  };

  return <Wrapper>
      {
      /* PRODUCT FAVORITE BUTTON */
    }
      {/* <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} /> */}

      <ContentWrapper>
        <div className="img-wrapper">
          {
          /* DISCOUNT PERCENT CHIP IF AVAILABLE */
        }
          <DiscountChip discount={calculateDiscountPercentage(price,salePrice)} />

          {
          /* PRODUCT IMAGE / THUMBNAIL */
        }
          <LazyImage src={imgUrl} alt={title} width={100} height={100} />
        </div>

          <Divider sx={{width:{sx:1, sm:0}}}/>
        <div className="content">
          <div>
            {
            /* PRODUCT TAG LIST */
          }
            <ProductTags tags={tags} />

            {
            /* PRODUCT TITLE / NAME */
          }
            <Link href={`/products/${id}`}>
              <H5 fontWeight="700" mt={1} mb={2}>
                {title}
              </H5>
            </Link>
            <CategoryWrapper>{variant}</CategoryWrapper>

            {
            /* PRODUCT RATING / REVIEW  */
          }
            {/* <Rating size="small" value={rating} color="warn" readOnly /> */}

            {
            /* PRODUCT PRICE */
          }
            <ProductPrice price={price} discount={salePrice} />
          </div>

          {
          /* PRODUCT ADD TO CART BUTTON */
        }
          <QuantityButtons limit={limit} stock={stock} quantity={cartItem?.qty || 0} handleIncrement={handleIncrementQuantity} handleDecrement={handleDecrementQuantity} />
        </div>
      </ContentWrapper>
    </Wrapper>;
}