import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent"; 
// MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; 
// GLOBAL CUSTOM COMPONENTS

import { Carousel } from "components/carousel";
import BazaarImage from "components/BazaarImage";
import FlexBox from "components/flex-box/flex-box";
import { H1, H2, H3, H6, Paragraph } from "components/Typography"; 
// LOCAL CUSTOM HOOKS

import useCart from "hooks/useCart"; 
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; 
import { NO_IMAGE_FOR_PRODUCT } from "utils/constants";
import { Box } from "@mui/material";
import ProductPrice from "components/product-cards/product-price";
// =====================================================


// =====================================================
export default function ProductViewDialog(props) {
  const {
    product,
    openDialog,
    handleCloseDialog,
    isPreview,
    handleIncrementQuantity
  } = props;
  const {
    state,
    dispatch
  } = useCart();
  const cartItem = state.cart.find(item => item.id === product.id);

  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product,
        qty: amount,
        name: product.title,
        imgUrl: product.images.length > 0 ? product.images[0]: NO_IMAGE_FOR_PRODUCT
      }
    });
  };

  return <Dialog open={openDialog} maxWidth={false} onClose={handleCloseDialog} sx={{
    zIndex: 1501
  }}>
      <DialogContent sx={{
      maxWidth: 900,
      width: "100%"
    }}>
        <div>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {product.images.length > 0 ? 
              
              <>{product.images.length > 2 ? <Carousel slidesToShow={1} arrowStyles={{
              boxShadow: 0,
              color: "primary.main",
              backgroundColor: "transparent"
            }}>
                {product.images.map((item, index) => <BazaarImage key={index} src={item} alt="product" sx={{
                mx: "auto",
                width: "100%",
                objectFit: "contain",
                height: {
                  sm: 400,
                  xs: 250
                }
              }} />)}
              </Carousel> : <BazaarImage  src={product.images[0]} alt="product" sx={{
                mx: "auto",
                width: "100%",
                objectFit: "contain",
                height: {
                  sm: 400,
                  xs: 250
                }
              }} />}</> : <BazaarImage  src={NO_IMAGE_FOR_PRODUCT} alt="product" sx={{
                mx: "auto",
                width: "100%",
                objectFit: "contain",
                height: {
                  sm: 400,
                  xs: 250
                }
              }} />}
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{product.name}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                {`CATEGORY: ${product.category ? product.category.name :''}`}
              </Paragraph>

<ProductPrice discount={product.salePrice} price={product.price} isHigh={true} />

              {/* <FlexBox alignItems="center" gap={1} mt={1}>
                <Rating color="warn" value={4} readOnly />
                <H6 lineHeight="1">(50)</H6>
              </FlexBox> */}

              <Box my={2} className="truncated-text" color="grey.500">
              {product.shortDescription }
              </Box>

              <Divider sx={{
              mb: 2
            }} />

             {!isPreview && <> {!cartItem?.qty ? <Button size="large" color="primary" variant="contained" onClick={handleIncrementQuantity} sx={{
              height: 45,
              borderRadius: 2
            }}>
                  Add to Cart
                </Button> : <FlexBox alignItems="center">
                  <Button size="small" color="primary" variant="outlined" sx={{
                p: ".6rem",
                height: 45
              }} onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button size="small" color="primary" variant="outlined" sx={{
                p: ".6rem",
                height: 45
              }} onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>}</>}
            </Grid>
          </Grid>
        </div>

        <IconButton sx={{
        position: "absolute",
        top: 3,
        right: 3
      }} onClick={handleCloseDialog}>
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>;
}