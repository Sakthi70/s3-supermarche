"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider"; 
// GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; 
// GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; 
// LOCAL CUSTOM COMPONENTS

import CartItem from "./cart-item";
import ListItem from "../list-item";
import { useEffect, useState } from "react";
import { calculatePercentageValue } from "utils/util";
import useApp from "hooks/useApp";
export default function CheckoutAltSummary() {
  const {
    state
  } = useCart();
  const {content} = useApp();
  const {settings} = content;
  const [amount, setamount] = useState(0);

  useEffect(() => {
    setamount(getTotalPrice());
  }, [state.cart])
  
  const getTotalPrice = () => {
    return state.cart.reduce((acc, item) => acc + (item.salePrice || item.price) * item.qty, 0);
  };

  const getFinalPrice =()=>{
    let per = calculatePercentageValue(settings.vat??0, amount);
    return amount + (settings.shipping ?? 0) + per
  }
  return <div>
      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        Your order
      </Paragraph>

      {state.cart.map(({
      name,
      qty,
      price,
      salePrice,
      id
    }) => <CartItem name={name} price={(salePrice||price)} qty={qty} key={id} />)}

      <Box component={Divider} borderColor="grey.300" my={3} />

      <ListItem title="Subtotal" value={amount} />
      <ListItem title="Shipping" value={settings.shipping} />
      <ListItem title="Vat"  value={settings.vat ? calculatePercentageValue(settings.vat ?? 0, amount):null}/>

      <Box component={Divider} borderColor="grey.300" mb={1} />

      <ListItem title="Total" value={getFinalPrice()} color="inherit" />
    </div>;
}