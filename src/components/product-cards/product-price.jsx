import Box from "@mui/material/Box"; 
// GLOBAL CUSTOM COMPONENTS

import FlexBox from "components/flex-box/flex-box";
import { H1, Paragraph } from "components/Typography"; 
// CUSTOM UTILS LIBRARY FUNCTIONS

import { calculateDiscount, currency } from "lib"; 
// ==============================================================


// ==============================================================
export default function ProductPrice({
  discount,
  price,
  isHigh = false
}) {
  return <FlexBox alignItems={isHigh? "baseline":"center"}  gap={1} mt={0.5}>
      {isHigh ? <H1 color="primary.main">{currency((discount && discount > 0) ? discount: price)}</H1>: <Paragraph fontWeight={600} color="primary.main">
      {currency((discount && discount > 0) ? discount: price)}
      </Paragraph>}

      {(discount && discount > 0) ? <Box component="del" fontWeight={600} color="grey.600">
          {currency(price)}
        </Box> : null}
    </FlexBox>;
}