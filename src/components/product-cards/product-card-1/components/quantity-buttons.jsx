import { Fragment } from "react";
import Button from "@mui/material/Button"; 
// MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove"; 
// GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography"; 
// ==============================================================


// ==============================================================
export default function QuantityButtons(props) {
  const {
    quantity,
    handleDecrement,
    handleIncrement,
    limit,stock
  } = props || {};
  return <FlexBox  alignItems="center" className="add-cart" flexDirection="row-reverse" justifyContent={quantity ? "space-between" : "flex-start"}>
      <Button disabled={quantity >= stock || (limit && quantity>=limit)} color="primary" variant="outlined" onClick={handleIncrement} sx={{
      padding: "3px"
    }}>
        <Add fontSize="small" />
      </Button>

      {quantity ? <Fragment >
          <Paragraph sx={{px:1}}  color="text.primary" fontWeight="600">
            {quantity}
          </Paragraph>

          <Button color="primary" variant="outlined" onClick={handleDecrement} sx={{
        padding: "3px"
      }}>
            <Remove fontSize="small" />
          </Button>
        </Fragment> : null}
    </FlexBox>;
}