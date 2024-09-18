import IconButton from "@mui/material/IconButton"; 
// MUI ICON COMPONENTS

import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; 
// STYLED COMPONENTS

import { HoverIconWrapper } from "../styles"; 
import { AllOut, Delete, Edit } from "@mui/icons-material";
// ==============================================================


// ==============================================================
export default function HoverActions({
  toggleView,
  toggleEdit,
  toggleDelete,
  toggleExpand,
  isEdit = false,
  isDelete = false,
  isExpand=false,
  isToggleView = true
}) {
  return <HoverIconWrapper className="hover-box">
      {isToggleView && <IconButton onClick={toggleView}>
        <RemoveRedEye color="action" fontSize="small" />
      </IconButton>}

      {isEdit && <IconButton onClick={toggleEdit}>
        <Edit color="action" fontSize="small" />
      </IconButton>}
      {isDelete && <IconButton onClick={toggleDelete}>
        <Delete color="action" fontSize="small" />
      </IconButton>}
      {isExpand && <IconButton onClick={toggleExpand}>
        <AllOut color="action" fontSize="small" />
      </IconButton>}
      {/* <IconButton onClick={toggleFavorite}>
        {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" color="disabled" />}
      </IconButton> */}
    </HoverIconWrapper>;
}