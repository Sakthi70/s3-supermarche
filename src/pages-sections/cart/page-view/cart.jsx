"use client";

import Grid from "@mui/material/Grid"; 
// GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; 
// LOCAL CUSTOM COMPONENTS

import CartItem from "../cart-item";
import { CheckoutSummary } from "pages-sections/checkout/checkout-summery";
export default function CartPageView() {
  const {
    state
  } = useCart();
  return <Grid container spacing={3}>
      {
      /* CART PRODUCT LIST */
    }
      <Grid item md={8} xs={12}>
        {state.cart.map(({
        name,
        id,
        price,
        salePrice,
        limit,stock,
        qty,
        slug,
        imgUrl
      }) => <CartItem id={id} limit={limit} stock={stock} key={id} qty={qty} name={name} slug={slug} salePrice={salePrice} price={price} imgUrl={imgUrl} />)}
      </Grid>

      {
      /* CHECKOUT FORM */
    }
      <Grid item md={4} xs={12}>
      <CheckoutSummary />
      </Grid>
    </Grid>;
}