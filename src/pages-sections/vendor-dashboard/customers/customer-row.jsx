import Avatar from "@mui/material/Avatar"; 
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete"; 
// GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography"; 
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; 
// STYLED COMPONENTS

import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import Warning from "components/warning/warning";
import { Box } from "@mui/material";
import { AdminPanelSettings, CheckCircle, GroupRemove } from "@mui/icons-material";
// ========================================================================


// ========================================================================
export default function CustomerRow({
  customer,deleteUser,updateUser
}) {

  const router =useRouter();
  const [open, setopen] = useState(false);
  const [adminOpen, setadminOpen] = useState(false)
  const {
    email,
    id,
    name,
    phone,
    image,
    balance,
    isAdmin
  } = customer || {};
  const STYLE = {
    fontWeight: 400
  };

   const onSubmit =async()=>{
      await deleteUser(id, customer?._count?.orders);
      setopen(false)
   }

   const onSubmitAdmin = async() =>{
    await updateUser(id, isAdmin);
      setadminOpen(false)
   }
  
  return <StyledTableRow tabIndex={-1} role="checkbox">
    <Warning open={open} title={'Delete Customer'} content={'Are you sure to delete the customer?'} ok="Cancel" isSubmit={true} submit="Delete" onSubmit={onSubmit} handleClose={() => setopen(false)} />
    <Warning open={adminOpen} title={'Admin Status Change'} content={isAdmin ? 'Are you sure to remove user from Admin?' : 'Are you sure to add customer to Admin user list?'} ok="Cancel" isSubmit={true} submit="Confirm" onSubmit={onSubmitAdmin} handleClose={() => setadminOpen(false)} />
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={name} src={image} />
          <Paragraph fontWeight={600}>{name}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {phone}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {email}
      </StyledTableCell>

      {/* <StyledTableCell align="left" sx={STYLE}>
        {currency(balance)}
      </StyledTableCell> */}

      <StyledTableCell align="center" sx={STYLE}>
        {customer?._count?.orders}
      </StyledTableCell>


      <StyledTableCell align="left">

        {customer.isAdmin && <Box display={'flex'} justifyContent={'center'} width={1} > <CheckCircle color={"success"}/> </Box>}
      </StyledTableCell>

      <StyledTableCell align="center">

      <StyledIconButton onClick={() => setadminOpen(true)}>
          {isAdmin? <GroupRemove/> : <AdminPanelSettings />}
        </StyledIconButton>

        <StyledIconButton onClick={() => router.push(`/admin/customers/${id}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={() => setopen(true)}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
}