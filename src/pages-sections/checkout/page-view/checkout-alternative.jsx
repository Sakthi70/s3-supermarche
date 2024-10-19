"use client"
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; 
// LOCAL CUSTOM COMPONENTS

import { CheckoutForm } from "../checkout-alt-form";
import { CheckoutAltSummery } from "../checkout-alt-summery";
import useCart from "hooks/useCart";
import useApp from "hooks/useApp";
import { useEffect, useState } from "react";
import { calculatePercentageValue } from "utils/util";
export default function CheckoutAlternativePageView() {

  const {
    state
  } = useCart();
  const {content} = useApp();
  const {settings} = content;
  const [amount, setamount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

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

 useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: getFinalPrice() }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);


  return <Container sx={{
    my: "1.5rem"
  }}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} xs={12} order={{ xs: 2, md: 1 }}>
          <CheckoutForm  clientSecret={clientSecret} dpmCheckerLink={dpmCheckerLink}/>
        </Grid>

        <Grid item order={{ xs: 1, md: 2 }} lg={4} md={4} xs={12}>
          <CheckoutAltSummery />
        </Grid>
      </Grid>
    </Container>;
}