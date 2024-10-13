import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

// MUI ICON COMPONENTS
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ModeEditOutline from "@mui/icons-material/ModeEditOutline"; 
// LOCAL CUSTOM COMPONENTS

import Heading from "./heading";
import NewAddressForm from "./new-address-form";
import EditAddressForm from "./edit-address-form"; 
// GLOBAL CUSTOM COMPONENTS

import { H2, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import Place from "@mui/icons-material/Place";
import Warning from "components/warning/warning";


// ==============================================================
const DeliveryAddress = ({
  addresses,
  userId,
  selectedItem,
  isSelection=false,
  handleAddNewAddress,
  handleDeleteAddress,
  handleEditAddress,
  handleFieldValueChange
}) => {

  const [selectedId, setselectedId] = useState();
  
  const [editAddressId, setEditAddressId] = useState(0);

  const changeEditAddressId = () => setEditAddressId(0);

  return <Card sx={{
    p: 3,
    my: 3
  }}>
      <Warning open={selectedId} content={'Are you sure to delete the address?'} title={'Delete Address'} ok="Cancel" isSubmit={true} onSubmit={async()=>{await handleDeleteAddress(selectedId); setselectedId(null)}} handleClose={() => setselectedId(null)} submit="Delete" />
      <FlexBetween mb={4}>
        <FlexBox alignItems="center" gap={1.5}>
          <Place color="primary" />
          <H2 my={0} lineHeight={1} ellipsis>
            {'My Addresses'}
          </H2>
        </FlexBox>
        <NewAddressForm handleAddNewAddress={handleAddNewAddress} />
      </FlexBetween>

      <Grid container spacing={3}>
        {addresses.map((item, ind) => <Grid item md={4} sm={6} xs={12} key={ind}>
            <Card onClick={isSelection ? () => handleFieldValueChange(item.id, "address"): null} sx={{
          padding: 2,
          boxShadow: "none",
          cursor: isSelection ? "pointer":"default",
          border: "1px solid",
          position: "relative",
          backgroundColor: "grey.100",
          borderColor:  selectedItem ===item.id ? "primary.main" :  "grey.400"
        }}>
              <FlexBox position="absolute" top={5} right={5}>
                <IconButton size="small" onClick={() => setEditAddressId(item.id)}>
                  <ModeEditOutline fontSize="inherit" />
                </IconButton>

                <IconButton size="small" color="error" onClick={() => setselectedId(item.id)}>
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
              </FlexBox>

              <H6 mb={0.5}>{item.name}</H6>
              <Paragraph color="grey.700">{item.address}</Paragraph>
               <Paragraph color="grey.700">{item.city}</Paragraph>
              <Paragraph color="grey.700">{item.phone}</Paragraph>
            </Card>
          </Grid>)}
      </Grid>

      {
      /* SHOW EDIT ADDRESS FORM MODAL WHEN CLICK EDIT BUTTON */
    }
      {editAddressId ? <EditAddressForm handleEditAddress={handleEditAddress} openModal={editAddressId ? true : false} handleCloseModal={changeEditAddressId} currentAddress={addresses.find(item => item.id === editAddressId)} /> : null}
    </Card>;
};

export default DeliveryAddress;