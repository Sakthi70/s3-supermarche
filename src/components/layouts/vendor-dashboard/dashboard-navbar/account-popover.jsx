"use client";

import { useState } from "react"; 
// MUI

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton"; 
// GLOBAL CUSTOM COMPONENTS

import { H6, Small } from "components/Typography"; 
import { logout } from "actions/auth";
import { t } from "utils/util";
import { PersonOutline } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// STYLED COMPONENT

const Divider = styled("div")(({
  theme
}) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`
}));
export default function AccountPopover({isAdmin = true}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {data:session} = useSession();
  const router = useRouter();


  const handleClose = () => setAnchorEl(null);

  const signOut =async() => await logout();


  return <div>
     {isAdmin && <IconButton sx={{
      padding: 0
    }} aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} aria-expanded={open ? "true" : undefined} aria-controls={open ? "account-menu" : undefined}>
        <Avatar alt={t("Admin")} src={session.user?.image ??"/assets/images/avatars/001-man.svg"} />
      </IconButton>}

     {!isAdmin && <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
        <PersonOutline sx={{ color: "grey.600"}} />
      </IconButton>}

      <Menu open={open} id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} transformOrigin={{
      horizontal: "right",
      vertical: "top"
    }} anchorOrigin={{
      horizontal: "right",
      vertical: "bottom"
    }} slotProps={{
      root:{
          sx:{zIndex:1700}
      },
      paper: {
        elevation: 0,
        sx: {
          mt: 1,
          boxShadow: 2,
          minWidth: 200,
          borderRadius: "8px",
          overflow: "visible",
          border: "1px solid",
          borderColor: "grey.200",
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "grey.200"
          },
          "&:before": {
            top: 0,
            right: 14,
            zIndex: 0,
            width: 10,
            height: 10,
            content: '""',
            display: "block",
            position: "absolute",
            borderTop: "1px solid",
            borderLeft: "1px solid",
            borderColor: "grey.200",
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)"
          }
        }
      }
    }}>
        {isAdmin && <MenuItem><Box px={2} pt={1}>
          <H6>{session.user?.name}</H6>
          <Small color="grey.500">{t("Admin")}</Small>
        </Box> </MenuItem>}

{isAdmin &&  <Divider />}
        {!isAdmin && session.user.admin &&<MenuItem onClick={() => {router.push('/vendor/dashboard')}}>{t("Admin Dashboard")}</MenuItem>}

{!isAdmin && session.user.admin && <Divider />}
        <MenuItem onClick={() => {router.push('/profile')}}>{t("Profile")}</MenuItem>
        {/* <MenuItem>Settings</MenuItem> */}
        <Divider />
        <MenuItem onClick={signOut}>{t("Logout")}</MenuItem>
      </Menu>
    </div>;
}