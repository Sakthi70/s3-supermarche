
// GLOBAL CUSTOM COMPONENTS
import { Box } from "@mui/material";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link"; 
import Image from "next/image";
// ==============================================================


// ==============================================================
export default function LinkItem({
  href,
  title,
  icon,
  ml = 4
}) {
  return <NavLink href={`/products/search${href}`} color="grey.700">
    <FlexBox py={1} gap={1.5} alignItems="center">
     {icon ? <Image src={icon} width={40} height={40} style={{borderRadius:'50%'}} alt={title}/> : <Box width={40} height={40}></Box>}
      <Span >{title}</Span>
    </FlexBox>
     
    </NavLink>;
}