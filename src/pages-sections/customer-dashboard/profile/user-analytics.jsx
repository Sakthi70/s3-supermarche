import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar"; 
// GLOBAL CUSTOM COMPONENTS

import { FlexBetween, FlexBox } from "components/flex-box";
import { H3, H5, Paragraph, Small } from "components/Typography"; 
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; 
import { Box } from "@mui/material";
// CUSTOM DATA MODEL


// ==============================================================
export default function UserAnalytics({
  user
}) {
  const INFO_LIST = [{
    title: "16",
    subtitle: "All Orders"
  }, {
    title: "02",
    subtitle: "Awaiting Payments"
  }, {
    title: "00",
    subtitle: "Awaiting Shipment"
  }, {
    title: "01",
    subtitle: "Awaiting Delivery"
  }];
  return <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <Card sx={{
        gap: 2,
        height: "100%",
        display: "flex",
        p: "1rem 1.5rem",
        alignItems: "center"
      }}>
          <Avatar alt={user.name} src={user.image} sx={{
          height: 64,
          width: 64
        }} />

          <FlexBetween flexWrap="wrap" flex={1}>
            <div>
              <H5>{`${user.name}`}</H5>

            </div>
            <Box>
            <Paragraph color="grey.600">{user.email}</Paragraph>
            <Paragraph color="grey.600" letterSpacing={3}>
             {user.phone}
            </Paragraph></Box>
          </FlexBetween>
        </Card>
      </Grid>

      <Grid item container spacing={3} md={6} xs={12}>
        {INFO_LIST.map(item => <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
            <Card sx={{
          height: "100%",
          display: "flex",
          p: "1rem 1.25rem",
          alignItems: "center",
          flexDirection: "column"
        }}>
              <H3 color="primary.main" my={0} fontWeight={600}>
                {item.title}
              </H3>

              <Small color="grey.600" textAlign="center">
                {item.subtitle}
              </Small>
            </Card>
          </Grid>)}
      </Grid>
    </Grid>;
}