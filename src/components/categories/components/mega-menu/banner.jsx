import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
import { H3, Paragraph, Small } from "components/Typography";
export default function OfferBanner() {
  return <Link href="/sale-page-2">
      <Grid container mb={-1} spacing={0} className="h-full" wrap="wrap-reverse" alignItems="center">
        <Grid item sm={6} xs={12}>
          <Box px={2.5}>
            <H3 mb={1}>Big Sale Upto 60% Off</H3>

            <Paragraph color="grey.600" mb={1}>
              Handcrafted from genuine Italian Leather
            </Paragraph>

            <Small fontWeight="700" borderBottom="2px solid" borderColor="primary.main">
              SHOP NOW
            </Small>
          </Box>
        </Grid>

        <Grid item sm={6} xs={12}>
          <FlexBox height="160px" position="relative" flexDirection="column" justifyContent="flex-end">
            <LazyImage alt="model" width={292} height={195} src="/assets/images/models/model-1.png" />
          </FlexBox>
        </Grid>
      </Grid>
    </Link>;
}