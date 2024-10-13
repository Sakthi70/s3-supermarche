import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 
// LOCAL CUSTOM COMPONENTS

import AppStore from "./components/app-store";
import SocialLinks from "./components/social-links"; 
// GLOBAL CUSTOM COMPONENTS

import BazaarImage from "components/BazaarImage";
import { H6, Paragraph } from "components/Typography"; 
// DATA

import { CUSTOMER_CARE_LINKS } from "./data"; 
// STYLED COMPONENTS

import { StyledFooter, StyledLink } from "./styles";
import useApp from "hooks/useApp";
import { FOOTER_IMAGE } from "utils/constants";
import { Typography } from "@mui/material";
export default function Footer2() {
  const {content} =useApp();
  const {settings,footerLinks}= content;
  return <Box sx={{
    mb: {
      md: 0,
      // sm:4,
      xs: 8
    }
  }}><StyledFooter sx={{
    padding: 2,
    color: "white",
    // borderRadius: 2,
    bgcolor: "#141850",
   
  }}>
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}>
          <Link href="/">
            <BazaarImage mb={2.5} src={settings.footerImage ?? FOOTER_IMAGE} sx={{width:'100%', maxWidth:250}} alt="logo" />
          </Link>

          <div dangerouslySetInnerHTML={{__html: settings.description ?? ""}}></div>
          <SocialLinks />
        </Grid>

        <Grid item sm={4} xs={12}>
        <H6>{settings.secondHeader}</H6>
          <Box mb={2}  mt={2}>
            {footerLinks.filter(x=> x.col ===2).map((item, ind) => <StyledLink href={item.url} key={ind}>
                {item.name}
              </StyledLink>)}
          </Box>
        </Grid>
        <Grid item sm={4} xs={12}>
        <H6>{settings.thirdHeader}</H6>
          <Box mb={2}  mt={2}>
            {footerLinks.filter(x=> x.col ===3).map((item, ind) => <StyledLink href={item.url} key={ind}>
                {item.name}
              </StyledLink>)}
          </Box>
        </Grid>
      </Grid>
      
    </StyledFooter> 
    
    <Box color={'white'} p={1} bgcolor={'GrayText'} width={1} justifyContent={'space-between'} gap={1}  display={{xs:'grid', sm:'flex'}}>
      <Typography fontWeight={600} fontStyle={'italic'} variant="caption">{`S3 Supermarche 2024 © All rights reserved`}</Typography>
        <Typography fontWeight={600} fontStyle={'italic'} variant="caption">{`Made by Geeo Technologies © 2024`}</Typography>
      </Box>
    </Box>;
}