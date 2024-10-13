import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField"; 
// LOCAL CUSTOM COMPONENT

import ListItem from "../list-item"; 
// GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; 
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib";
import useCart from "hooks/useCart";
import { useEffect, useState } from "react";
import useApp from "hooks/useApp";
import { calculatePercentageValue } from "utils/util";
import { useRouter } from "next/navigation";
export default function CheckoutSummary() {
  const {
    state
  } = useCart();
  const {content} = useApp();
  const {
    push
  } = useRouter();
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

  return <Card sx={{
    p: 3
  }}>
      <ListItem mb={1} title="Subtotal" value={amount} />
      <ListItem mb={1} title="Shipping" value={settings.shipping} />
      <ListItem mb={1} title="Vat" value={settings.vat ? calculatePercentageValue(settings.vat ?? 0, amount):null} />

      <Divider sx={{
      my: 2
    }} />

      <Paragraph fontSize={25} fontWeight={600} mb={2} lineHeight={1}>
        {currency(getFinalPrice())}
      </Paragraph>

      
     <Button variant="contained"  color="primary" onClick={()=> push('/checkout')} fullWidth>
          Checkout Now
        </Button>
    </Card>;
}